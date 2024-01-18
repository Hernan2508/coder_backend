export function isAdmin(req, res, next) {
    const user = req.user;

    if (!user || user.role !== 'admin') {
        return res.status(403).json({ status: 'error', message: 'Forbidden - Admin access required' });
    }

    next();
}

export function isUser(req, res, next) {
    const user = req.user;

    if (!user || user.role !== 'usuario') {
        return res.status(403).json({ status: 'error', message: 'Forbidden - User access required' });
    }

    next();
}