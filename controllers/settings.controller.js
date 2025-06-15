const pool = require('../config/database');

exports.getAllSettings = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM settings');
        const settings = {};
        rows.forEach(row => {
            settings[row.key_name] = row.value;
        });
        res.json(settings);
    } catch (error) {
        console.error('Ошибка при получении настроек:', error.message);
        res.status(500).json({ error: 'Не удалось получить настройки' });
    }
};

exports.updateSetting = async (req, res) => {
    const { key } = req.params;
    const { value } = req.body;

    try {
        await pool.query(
            'UPDATE settings SET value = ?, updated_at = NOW() WHERE key_name = ?',
            [value, key]
        );
        res.json({ success: true });
    } catch (error) {
        console.error('Ошибка при обновлении настройки:', error.message);
        res.status(500).json({ error: 'Не удалось обновить настройку' });
    }
};