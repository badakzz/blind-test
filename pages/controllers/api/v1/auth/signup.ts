import ApiRouter from "@greenscope/common/apiRouter"
import Joi from "joi"
import {
    BadRequestError,
    ForbiddenError,
    InvalidPasswordResetTokenError,
} from "@greenscope/common/errors"
import Knex from "@greenscope/common/knex"
import { withCsrfToken } from "@greenscope/common/middleware"
import {
    activateMembership,
    cancelAllInvitations,
    fetchValidInvitationAndMembershipByToken,
    validateActiveInvitation,
} from "@greenscope/common/dao"
import {
    INPUT_VALIDATION_RULE,
    LANG,
    ORG_MEMBERSHIP_STATUS,
} from "@greenscope/common/constants"
import {
    invitationTokenRequiredValidation,
    sanitizeStringFilterHtmlOut,
} from "@greenscope/common/validations"
import { signup } from "../../../../../../lib/auth/AppUser"

const schemaQuery = Joi.object({
    token: invitationTokenRequiredValidation,
})

const schemaPost = Joi.object({
    csrfToken: Joi.string().required(),
    firstname: Joi.string()
        .required()
        .max(INPUT_VALIDATION_RULE.CHAR_LIMIT_TINY)
        .min(1)
        .custom(sanitizeStringFilterHtmlOut),
    lastname: Joi.string()
        .required()
        .max(INPUT_VALIDATION_RULE.CHAR_LIMIT_TINY)
        .min(1)
        .custom(sanitizeStringFilterHtmlOut),
    // impacts language selections
    lang: Joi.string()
        .required()
        .allow(...Object.values(LANG)),
    password: Joi.string().required().max(32).min(4),
})

/*
    Complete signup and validate an invitation
 */
export default ApiRouter([withCsrfToken()], {
    post: async (req, res) => {
        let sanitizedBody
        let sanitizedQuery
        try {
            sanitizedBody = await schemaPost.validateAsync(req.body)
            sanitizedQuery = await schemaQuery.validateAsync(req.query)
        } catch (err) {
            throw new BadRequestError("Invalid input", { err })
        }

        return Knex.transaction(async (trx) => {
            // Get valid invitation and membership infos
            const invitation = await fetchValidInvitationAndMembershipByToken(
                trx,
                sanitizedQuery.token
            )

            if (!invitation) {
                throw new InvalidPasswordResetTokenError("Invalid token")
            }

            if (invitation.expires_at < new Date()) {
                throw new InvalidPasswordResetTokenError("Expired token")
            }

            if (invitation.memb_status !== ORG_MEMBERSHIP_STATUS.PENDING) {
                throw new ForbiddenError("Membership is not pending")
            }

            const newProfile = await signup(trx, {
                userId: invitation.user_id,
                password: sanitizedBody.password,
                firstname: sanitizedBody.firstname,
                lastname: sanitizedBody.lastname,
                lang: sanitizedBody.lang,
            })

            // Validate this invitation
            await validateActiveInvitation(trx, sanitizedQuery.token)

            // Cancel all other invitations
            await cancelAllInvitations(trx, invitation.memb_id)

            // Activate membership
            await activateMembership(trx, newProfile.id, invitation.memb_id)

            return res.status(200).json({
                org_id: invitation.org_id,
                updated_at: new Date(),
                setup: true,
                email: newProfile.email,
            })
        })
    },
})
