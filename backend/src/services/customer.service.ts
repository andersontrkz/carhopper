import CustomerModel from "@/database/models/customer.model";

const getCustomerByPk = async (customerId: string) => CustomerModel.findByPk(customerId);

const saveCustomer = async (id: string) => CustomerModel.create({ id });

const CustomerService = {
    getCustomerByPk,
    saveCustomer,
};

export default CustomerService;
