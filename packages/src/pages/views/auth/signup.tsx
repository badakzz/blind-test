import Link from 'next/link'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Button from '../../../components/Button'
import { FaSave } from 'react-icons/fa'
import { Formik } from 'formik'
import { useToastContext } from '../../../components/ToastProvider'
import router, { useRouter } from 'next/router'
import axios from 'axios'
import {
    isEmailValid,
    isPasswordValid,
    getPasswordRuleLabel,
} from '../../../utils/helpers'
import { useState } from 'react'
import Layout from '../../../components/Layout'

// const Register = () => {
//     const router = useRouter()
//     const [profile, setProfile] = useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     })

//     const { showErrorToast } = useToastContext()

//     const validate = (values) => () => {
//         const errors: {
//             firstname?: string
//             lastname?: string
//             email?: string
//             password?: string
//             confirmPassword?: string
//             lang?: string
//         } = {}

//         if (!values.firstname) {
//             errors.firstname = 'Please enter a valid first name'
//         }

//         if (!values.lastname) {
//             errors.lastname = 'Please enter a valid last name'
//         }

//         if (!values.email || !isEmailValid(values.email)) {
//             errors.email = 'Please enter a valid last name'
//         }

//         if (!values.password || !isPasswordValid(values.password)) {
//             errors.password = getPasswordRuleLabel()
//         }

//         if (
//             !values.confirmPassword ||
//             values.confirmPassword !== values.password
//         ) {
//             errors.confirmPassword = 'Please enter a valid password confirmation'
//         }

//         return errors
//     }

//     const postProfile = async ({
//         lastname,
//         firstname,
//         lang,
//         password,
//     }: {
//         csrfToken?: string
//         lastname?: string
//         firstname?: string
//         lang?: string
//         password?: string
//     }): Promise<{
//         org_id: number
//     }> => {
//         const data: {
//             csrfToken?: string
//             lastname?: string
//             firstname?: string
//             lang?: string
//             password?: string
//         } = {}

//         if (lastname) {
//             data.lastname = lastname
//         }
//         if (firstname) {
//             data.firstname = firstname
//         }
//         if (lang) {
//             data.lang = lang
//         }
//         if (password) {
//             data.password = password
//         }

//         return axios
//             .post(
//                 `${publicRuntimeConfig.domain.apiBase}/auth/invitation/${invitationToken}/signup`,
//                 data,
//                 {
//                     withCredentials: true,
//                 }
//             )
//             .then(({ data }) => data)
//     }

//     const { mutate: postProfileMutate, isLoading: isPostingProfile } =
//         useMutation(postProfile, {
//             onError: (e) => showErrorToast(e),
//             onSuccess: (invitationResponse: { org_id: number }) => {
//                 signIn(AUTH_PROVIDER.GREENSCOPE, {
//                     email: user.email,
//                     password: profile.password,
//                 }).then(() => {
//                     router.push(`/orgs?org=${invitationResponse.org_id}`)
//                 })
//             },
//         })

//     return (
//         <div>
//             <h1>Register</h1>
//             <div className="d-flex align-items-center min-vh-100 bg-auth border-top border-top-2 border-primary">
// <Container>
//     <Row className="justify-content-center">
//         <Col xs={12} md={5} xl={4} className="my-5">
//                 <p>
//                     Sign up
//                 </p>
//             <Formik
//                 initialValues={profile}
//                 values={profile}
//                 onSubmit={() => {}}
//                 validate={validate(intl, profile)}
//             >
//                 {({
//                     errors,
//                     touched,
//                     handleBlur,
//                     setTouched,
//                 }) => {
//                     return (
//                         <>
//                             <Input
//                                 controlId="formProfileFirstname"
//                                 style={{ marginBottom: '1em' }}
//                                 placeholder="Lucas",
//                                     }
//                                 )}
//                                 required
//                                 name="firstname"
//                                 canHaveError
//                                 error={
//                                     touched.firstname
//                                         ? errors.firstname
//                                         : undefined
//                                 }
//                                 label="First name"
//                                 formControlProps={{
//                                     type: 'text',
//                                     value: profile.firstname,
//                                     onChange: (e) =>
//                                         setProfile({
//                                             ...profile,
//                                             firstname:
//                                                 e.target.value,
//                                         }),
//                                     onBlur: handleBlur,
//                                 }}
//                             />
//                             <Input
//                                 controlId="formProfileLastname"
//                                 style={{ marginBottom: '1em' }}
//                                 placeholder={intl.formatMessage(
//                                     {
//                                         description:
//                                             'invitation > complete signup > field lastname > placeholder',
//                                         defaultMessage:
//                                             'Bonisseur de la Bath',
//                                     }
//                                 )}
//                                 required
//                                 name="lastname"
//                                 canHaveError
//                                 error={
//                                     touched.lastname
//                                         ? errors.lastname
//                                         : undefined
//                                 }
//                                 label={intl.formatMessage({
//                                     description:
//                                         'invitation > complete signup > field lastname > label',
//                                     defaultMessage: 'Last name',
//                                 })}
//                                 formControlProps={{
//                                     type: 'text',
//                                     value: profile.lastname,
//                                     onChange: (e) =>
//                                         setProfile({
//                                             ...profile,
//                                             lastname:
//                                                 e.target.value,
//                                         }),
//                                     onBlur: handleBlur,
//                                 }}
//                             />
//                             <Input
//                                 controlId="formProfilePassword"
//                                 style={{
//                                     marginBottom: '1em',
//                                 }}
//                                 placeholder={intl.formatMessage(
//                                     {
//                                         description:
//                                             'invitation > complete signup > field password > placeholder',
//                                         defaultMessage:
//                                             'Password',
//                                     }
//                                 )}
//                                 required
//                                 name="password"
//                                 canHaveError
//                                 error={
//                                     touched.password
//                                         ? errors.password
//                                         : undefined
//                                 }
//                                 label={intl.formatMessage({
//                                     description:
//                                         'invitation > complete signup > field password > label',
//                                     defaultMessage: 'Password',
//                                 })}
//                                 formControlProps={{
//                                     type: 'password',
//                                     value: profile.password,
//                                     onChange: (e) =>
//                                         setProfile({
//                                             ...profile,
//                                             password:
//                                                 e.target.value,
//                                         }),
//                                     onBlur: handleBlur,
//                                 }}
//                             />
//                             <Input
//                                 className={confirmPasswordValidation()}
//                                 controlId="formProfileConfirmPassword"
//                                 style={{
//                                     marginBottom: '1em',
//                                 }}
//                                 placeholder={intl.formatMessage(
//                                     {
//                                         description:
//                                             'invitation > complete signup > field password confirm > placeholder',
//                                         defaultMessage:
//                                             'Repeat password',
//                                     }
//                                 )}
//                                 required
//                                 name="confirmPassword"
//                                 canHaveError
//                                 error={
//                                     touched.confirmPassword
//                                         ? errors.confirmPassword
//                                         : undefined
//                                 }
//                                 label={intl.formatMessage({
//                                     description:
//                                         'invitation > complete signup > field password confirm > label',
//                                     defaultMessage:
//                                         'Repeat password',
//                                 })}
//                                 formControlProps={{
//                                     type: 'password',
//                                     value: profile.confirmPassword,
//                                     onChange: (e) =>
//                                         setProfile({
//                                             ...profile,
//                                             confirmPassword:
//                                                 e.target.value,
//                                         }),
//                                     onBlur: handleBlur,
//                                 }}
//                             />
//                             <Row className="align-right">
//                                 <Col className="col-auto">
//                                     <Button
//                                         variant="primary"
//                                         disabled={
//                                             isPostingProfile ||
//                                             Object.values(
//                                                 errors
//                                             ).some(Boolean)
//                                         }
//                                         onClick={() =>
//                                             postProfileMutate(
//                                                 profile
//                                             )
//                                         }
//                                         isLoading={
//                                             isPostingProfile
//                                         }
//                                     >
//                                         <FaSave
//                                             style={{
//                                                 marginRight:
//                                                     '0.5em',
//                                                 marginTop:
//                                                     '-0.2em',
//                                             }}
//                                         />
//                                         <p>Save</p>
//                                     </Button>
//                                 </Col>
//                             </Row>
//                         </>
//                     )
//                 }}
//             </Formik>
//         </Col>
//     </Row>
// </Container>
// </div>
//     )

const Signup: React.FC = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: username,
                email: email,
                password: password,
            }),
        })

        if (res.ok) {
            // Redirect to success page
            router.push('/views/home')
        } else {
            // Handle error
            const { message } = await res.json()
            alert(message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Signup</button>
        </form>
    )
}

export default Signup
