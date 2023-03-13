import { createUser } from "../../../../controllers/users"
import userSchema from "../../../../controllers/validation/userSchema"

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { username, email, password, status } = req.body

            // Valider les entrées de l'utilisateur
            const validatedUser = await userSchema.validateAsync({
                username,
                email,
                password,
                status,
            })

            // Créer un utilisateur dans la base de données
            const user = await createUser(validatedUser)

            if (!user) {
                return res.status(500).json({
                    error: "Erreur lors de la création de l'utilisateur",
                })
            }

            return res
                .status(200)
                .json({ message: "Utilisateur créé avec succès", user })
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }

    return res
        .status(405)
        .json({ error: `La méthode ${req.method} n'est pas autorisée` })
}
