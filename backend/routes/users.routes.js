const router = require('express').Router();
const { logoutCustomer, loginCustomer, registerCustomer, updateCustomer } = require('../controllers/Users.controller');
const authUser = require('../middlewares/authUser')


/* GET users listing. */
router.post('/customers/register', registerCustomer);
router.post("/customers/login", loginCustomer);
router.post("/customers/logout", authUser, logoutCustomer);

router.put("/customers/:id", authUser, updateCustomer);
// router.get("/customers/me", authUser, getUserInfo);

module.exports = router;
