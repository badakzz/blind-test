"use strict";
exports.id = 677;
exports.ids = [677];
exports.modules = {

/***/ 7873:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Fg": () => (/* reexport */ IRON_SESSION_CONFIG),
  "Ju": () => (/* reexport */ isEmailValid),
  "jj": () => (/* reexport */ isFieldUnique)
});

// UNUSED EXPORTS: analyzeAnswerAndAttributeScore, calculateAnswerSimilarity, calculateLevenshteinDistance, getPasswordRuleLabel, isEmailDomainValid, isPasswordValid, normalizeAnswer, startGame, startPlayback, withSession

// EXTERNAL MODULE: ../../models/knex.js
var knex = __webpack_require__(5480);
var knex_default = /*#__PURE__*/__webpack_require__.n(knex);
;// CONCATENATED MODULE: ../common/utils/helpers/dbHelper.ts

async function isFieldUnique(tableName, fieldName, fieldValue) {
    const existingRecord = await knex_default()(tableName).where(fieldName, fieldValue).first();
    return !existingRecord;
}

;// CONCATENATED MODULE: ./utils/helpers/emailHelper.ts
const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
function isEmailValid(input) {
    if (!input) return false;
    return input.match(EMAIL_REGEXP) !== null;
}
const DOMAIN_REGEXP = /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})(\.[a-z]{2,})?$/;
function isEmailDomainValid(input) {
    if (!input) return false;
    return input.match(DOMAIN_REGEXP) !== null;
}

// EXTERNAL MODULE: external "next-iron-session"
var external_next_iron_session_ = __webpack_require__(4511);
;// CONCATENATED MODULE: ./utils/helpers/ironSessionHelper.ts

const IRON_SESSION_CONFIG = {
    password: "Blindtest123!Blindtest123!Blindtest123!",
    cookieName: "BLINDTESTCOOKIE",
    cookieOptions: {
        secure: "production" === "production"
    }
};
function withSession(handler) {
    return withIronSession(handler, IRON_SESSION_CONFIG);
}

;// CONCATENATED MODULE: ./utils/helpers/index.ts



// export * from "./generateUniqueId"




/***/ }),

/***/ 2677:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "So": () => (/* binding */ authenticateUser),
  "EL": () => (/* binding */ signupUser)
});

// UNUSED EXPORTS: createUser, deleteUser, getUserById, getUserByUsernameOrEmail, loginUser, updateUser

// EXTERNAL MODULE: ../../models/knex.js
var knex = __webpack_require__(5480);
var knex_default = /*#__PURE__*/__webpack_require__.n(knex);
// EXTERNAL MODULE: external "bcryptjs"
var external_bcryptjs_ = __webpack_require__(8432);
var external_bcryptjs_default = /*#__PURE__*/__webpack_require__.n(external_bcryptjs_);
;// CONCATENATED MODULE: ../common/utils/validation/userSchemas.ts
const Joi = __webpack_require__(8506);
const userSignupSchema = Joi.object({
    user_name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    permissions: Joi.number().optional(),
    is_active: Joi.boolean().optional()
});
const userSchemas_userLoginSchema = Joi.object({
    identifier: Joi.string().required(),
    password: Joi.string().required()
});

// EXTERNAL MODULE: ./utils/helpers/index.ts + 3 modules
var helpers = __webpack_require__(7873);
// EXTERNAL MODULE: ../common/constants/index.ts + 1 modules
var constants = __webpack_require__(1053);
;// CONCATENATED MODULE: ../common/dao/UserDAO.ts



async function createUser(userData) {
    return await knex_default()(constants/* TABLE.USERS */.F.USERS).insert(userData).returning("*").then((rows)=>rows[0]);
}
async function getUserById(id) {
    return knex_default().first("user_id", "user_name", "email", "is_active").where({
        user_id: id
    }).from(constants/* TABLE.USERS */.F.USERS);
}
async function getUserByUsernameOrEmail(identifier) {
    return knex_default()(constants/* TABLE.USERS */.F.USERS).where(function() {
        if ((0,helpers/* isEmailValid */.Ju)(identifier)) {
            this.where("email", identifier);
        } else {
            this.where("user_name", identifier);
        }
    }).first();
}
const updateUser = async (id, updates)=>{
    try {
        const [updatedUser] = await knex_default()("users").where({
            id
        }).update(updates).returning("*");
        return updatedUser;
    } catch (err) {
        console.error(err);
        return null;
    }
};
const deleteUser = async (id)=>{
    try {
        await knex_default()("users").where({
            id
        }).del();
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

;// CONCATENATED MODULE: ../common/services/userServices.ts






async function signupUser({ req , res  }) {
    const { error , value  } = userSignupSchema.validate(req.body, {
        abortEarly: false
    });
    if (error) {
        res.status(400).json({
            message: error.details.map((detail)=>detail.message)
        });
        console.log(error);
        return;
    }
    const { user_name , email , password , permissions , is_active  } = value;
    const hashedPassword = await external_bcryptjs_default().hash(password, 10);
    // Check if the username is unique
    const isUsernameUnique = await (0,helpers/* isFieldUnique */.jj)("users", "user_name", user_name);
    if (!isUsernameUnique) {
        res.status(400).json({
            message: "Username is already in use"
        });
        return;
    }
    // Check if the email is unique
    const isEmailUnique = await (0,helpers/* isFieldUnique */.jj)("users", "email", email);
    if (!isEmailUnique) {
        res.status(400).json({
            message: "Email is already in use"
        });
        return;
    }
    const user = await knex_default()(constants/* TABLE.USERS */.F.USERS).insert({
        user_name,
        email,
        password: hashedPassword,
        permissions: 1,
        is_active: true
    }).returning("*").then((rows)=>rows[0]);
    // Return the user object with the same structure as the authenticateUser function
    return {
        user_id: user.user_id,
        email: user.email,
        user_name: user.user_name,
        is_active: user.is_active
    };
}
async function loginUser({ req , res  }) {
    const { error , value  } = userLoginSchema.validate(req.body, {
        abortEarly: false
    });
    if (error) {
        res.status(400).json({
            message: error.details.map((detail)=>detail.message)
        });
        console.log(error);
        return;
    }
    const { identifier , password  } = value;
    try {
        const user = await authenticateUser(identifier, password);
        // Set the session cookie
        req.session.user = {
            id: user.user_id,
            email: user.email
        };
        res.status(200).json({
            message: "Logged in successfully"
        });
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
}
async function authenticateUser(identifier, password) {
    // Query the user by identifier only (either email or username)
    const user = await userServices_getUserByUsernameOrEmail(identifier);
    if (!user) {
        // Handle error: identifier not found
        throw new Error("Invalid identifier");
    }
    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await external_bcryptjs_default().compare(password, user.password);
    if (!isPasswordCorrect) {
        // Handle error: password is incorrect
        throw new Error("Invalid password");
    }
    // Return the user object with the username
    return {
        user_id: user.user_id,
        email: user.email,
        user_name: user.user_name,
        is_active: user.is_active
    };
}
const userServices_createUser = createUser;
const userServices_getUserById = getUserById;
const userServices_getUserByUsernameOrEmail = getUserByUsernameOrEmail;
const userServices_updateUser = updateUser;
const userServices_deleteUser = deleteUser;


/***/ })

};
;