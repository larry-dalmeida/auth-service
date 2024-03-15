export const getDBStatus = async () => {
    await db.query("SELECT * FROM app.users LIMIT 5");
    return true;
};