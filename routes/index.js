const router = require("express").Router()
const Controller = require("../controllers/controller")

router.get("/", Controller.home)
router.get("/customers", Controller.getAllCustomers)

router.get("/customers/register", Controller.getRegisterCustomer)
router.post("/customers/register", Controller.registerCustomer)

router.get("/customers/:idCustomer/editProfile", Controller.getEditCustomerProfile)
router.post("/customers/:idCustomer/editProfile", Controller.editCustomerProfile)

router.get("/customers/:idCustomer/accounts", Controller.getCustomerAccount)
router.post("/customers/:idCustomer/accounts", Controller.addCustomerAccount)

router.get("/customers/:idCustomer/accounts/:idAccount/transfer", Controller.getTransferForm)
router.post("/customers/:idCustomer/accounts/:idAccount/transfer", Controller.transfer)

module.exports = router