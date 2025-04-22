class UserModel {
    constructor(db) {
        this.db = db;
        this.table = 'users'; // Assuming a table named 'users' in the database
    }

    async createUser(userData) {
        const { username, password, email } = userData;
        const query = `INSERT INTO ${this.table} (username, password, email) VALUES (?, ?, ?)`;
        const result = await this.db.execute(query, [username, password, email]);
        return result;
    }

    async findUserByUsername(username) {
        const query = `SELECT * FROM ${this.table} WHERE username = ?`;
        const [user] = await this.db.execute(query, [username]);
        return user;
    }

    async findUserById(userId) {
        const query = `SELECT * FROM ${this.table} WHERE id = ?`;
        const [user] = await this.db.execute(query, [userId]);
        return user;
    }

    async updateUser(userId, updateData) {
        const { username, email } = updateData;
        const query = `UPDATE ${this.table} SET username = ?, email = ? WHERE id = ?`;
        const result = await this.db.execute(query, [username, email, userId]);
        return result;
    }

    async deleteUser(userId) {
        const query = `DELETE FROM ${this.table} WHERE id = ?`;
        const result = await this.db.execute(query, [userId]);
        return result;
    }
}

export default UserModel;