class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.authService.validateUser(email, password);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = this.authService.generateToken(user);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async logout(req, res) {
        // Implement logout functionality if needed
        return res.status(200).json({ message: 'Logged out successfully' });
    }
}

export default AuthController;