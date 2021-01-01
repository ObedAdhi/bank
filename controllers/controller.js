const {
  Customer,
  Account
} = require("../models")

const {
  balanceChecker
} = require('../helper/helper')


class Controller {
  static home (req, res) {
    res.render("home.ejs")
  }
  static getAllCustomers (req, res) {
    Customer.findAll({
      order: [
        ['fullName', 'ASC']
      ]
    })
    .then(data => {
      res.render("customers.ejs", {data})
    })
    .catch(err => {
      res.send(err.message)
    })

  }
  
  static getRegisterCustomer (req, res) {
    let errorMessage = ""
    if (req.query.error) {
      errorMessage = req.query.error
    }
    res.render("register.ejs", {errorMessage})
  }
  static registerCustomer (req, res) {
    let data = {
      identityNumber: req.body.identityNumber,
      fullName: req.body.fullName,
      address: req.body.address,
      birthDate: req.body.birthDate,
      gender: req.body.gender
    }
    Customer.create(data)
    .then(data => res.redirect("/customers"))
    .catch(err => {
      res.redirect(`/customers/register?error=${err.message}`)
    })
  }
  
  static getEditCustomerProfile (req, res) {
    let errorMessage = ""
    if (req.query.error) {
      errorMessage = req.query.error
    }
    let id = req.params.idCustomer
    Customer.findByPk(id)
    .then(data => 
      res.render("edit.ejs", {data, errorMessage})
    )
    .catch(err => {
      res.send(err.message)
    })
  }
  static editCustomerProfile (req, res) {
    let id = req.params.idCustomer
    let data = {
      identityNumber: req.body.identityNumber,
      fullName: req.body.fullName,
      address: req.body.address,
      birthDate: req.body.birthDate,
      gender: req.body.gender
    }
    Customer.update(data, {
      where: {id}
    })
    .then(data => {
      res.redirect("/customers")
    })
    .catch(err => {
      res.redirect(`/customers/${id}/editProfile?error=${err.message}`)
    })
  }
  
  static getCustomerAccount (req, res) {
    let id = req.params.idCustomer
    Customer.findByPk(id, {
      include: Account,
    })
    .then(data => 
      // res.send(data)
      res.render("accounts.ejs", {data})
    )
    .catch(err => res.send(err.message))
  }
  static addCustomerAccount (req, res) {
    let id = req.params.idCustomer
    let data = {
      type: req.body.type,
      balance: req.body.balance,
      accountNumber: req.body.balance,
      custId: id,
    }
    Account.create(data)
    .then(data => {
      res.redirect(`/customers/${id}/accounts`)
    })
    .catch(err => {
      res.send(err.message)
    })
  }
  
  static getTransferForm (req, res) {
    let id = req.params.idAccount
    let allAccount
    Account.findAll({
      include: Customer,
      order: [
        ['accountNumber', 'ASC']
      ]
    })
    .then(allAccountData => {
      allAccount = allAccountData
      return Account.findByPk(id)
    })
    .then(data => {
      res.render("transfer.ejs", {allAccount, data})
    })
    .catch(err => {
      res.send(err.message)
    })

  }
  static transfer (req, res) {
    let custId = req.params.idCustomer
    let minId = req.params.idAccount
    let plusId = req.body.transferId 
    let amount = req.body.amount
    let balance = req.body.balance
    let check = balanceChecker(balance, amount)
    if (check == false) {
      res.send("Insufficient balance")
    } else {
      Account.findByPk(plusId)
      .then(data => {
        data.balance += +amount
        return data.save()
      })
      .then(empty => {
        return Account.findByPk(minId)
      })
      .then(data2 => {
        data2.balance -= +amount
        return data2.save()
      })
      .then(empty => res.redirect(`/customers/${custId}/accounts`))
      .catch(err => res.send(err.message))
    }
  }
}

module.exports = Controller