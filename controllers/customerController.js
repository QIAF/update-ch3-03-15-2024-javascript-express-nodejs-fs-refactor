//isi dari controller adalah semua function dari api kita

const fs = require("fs"); //fs module bawaan node js

const customers = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/dummy.json`)
)

const getCustomerData = (req, res, next) => {
    console.log(req.requestTime);
    res.status(200).json({
        status : "success",
        totalData : customers.length,
        requestAt:req.requestTime, //data kapan api di head
        data:{
            customers,
        },
    });
};

const getCustomerById = (req, res, next) => {
    const id = req.params.id;

    //menggunakan array methode untuk membantu menemukan data spesifik data
    const customer = customers.find((cust) => cust._id === id);

    res.status(200).json({
        status : "success",
        data:{
            customer,
        },
    });
};

const updateCustomerData =  (req, res) => {
    console.log ("masuk edit ga")
    const id = req.params.id

    //1 melakukan pencarian data yang sesuai parameter idnya ada gak
    const customer = customers.find(cust => cust._id === id);
    const customerIndex = customers.findIndex(cust => cust._id === id);

    //2. ada ga data customernya
    if(!customer) {
        return res.status(404).json({ // not found
            status: "fail",
            message: `Customer dengan id : ${id} ga ada`,
        });
    }

    // 3. kalau ada, bararti update data sesuai req body dari client/user
    // oject asign = menggabungkan objek

    customers [customerIndex] = {...customers[customerIndex], ...req.body};
    console.log(customers[customerIndex]);

    // 4. melakukan update di dokumen jsonnya
    fs.writeFile(
        `${__dirname}/data/dummy.json`,
         JSON.stringify(customers),
         (err) => {
            res.status(200).json({
                status: "success",
                message: "berhasil update data",
            });
         }
    );
};

const deleteCustomerData = (req, res) => {
    const id = req.params.id

    //1 melakukan pencarian data yang sesuai parameter idnya ada gak
    const customer = customers.find(cust => cust._id === id);
    const customerIndex = customers.findIndex(cust => cust._id === id);

    //2. ada ga data customernya
    if(!customer) {
        return res.status(404).json({ // not found
            status: "fail",
            message: `Customer dengan id : ${id} ga ada`,
        });
    }

    // 3. kalau ada, bararti delete datanya
    customers.splice(customerIndex, 1);

    // 4. melakukan update di dokumen jsonnya
    fs.writeFile(
        `${__dirname}/data/dummy.json`,
         JSON.stringify(customers),
         (err) => {
            res.status(200).json({
                status: "success",
                message: "berhasil delete data",
            });
         }
    );
};

const createCustomerData = (req, res) => {
    console.log(req.body);

    const newCustomer = req.body

   customers.push(newCustomer);

   fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers), err =>{
    res.status(201).json({
        status : 'success',
        data: {
            customer: newCustomer,
        }
    }) // 201 = created
   })
};

module.exports ={
    getCustomerData,
    getCustomerById,
    updateCustomerData,
    deleteCustomerData,
    createCustomerData,
}