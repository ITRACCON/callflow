const pool = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username = ?', [username]
        );

        if (rows.length === 0) {
            return res.status(400).json({ error: 'Пользователь не найден' });
        }

        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).json({ error: 'Неверный логин или пароль' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        console.error('Ошибка при авторизации:', error.message);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};