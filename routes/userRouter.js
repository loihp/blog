const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/register", userCtrl.register);

router.post("/activation", userCtrl.activateEmail);

router.post("/login", userCtrl.login);

router.post("/refresh_token", userCtrl.getAccessToken);

router.post("/forgot", userCtrl.forgotPassword);

router.post("/reset", auth, userCtrl.resetPassword);

router.get("/info", auth, userCtrl.getUserInfo);

router.get("/all_info", auth, authAdmin, userCtrl.getUsersAllInfor);

router.get("/logout", userCtrl.logout);

router.get("/update", auth, userCtrl.updateUser);

router.get("/update_role/:id", auth, authAdmin, userCtrl.updateAllUsersRole);

router.get("/delete/:id", auth, authAdmin, userCtrl.deleteUser);

//Social Login
router.post("/google_login", userCtrl.googleLogin);
router.post("/facebook_login", userCtrl.facebookLogin);

module.exports = router;
