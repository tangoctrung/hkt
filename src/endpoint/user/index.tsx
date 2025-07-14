import AxiosInstance from "../api";

// Staff
export const getStaffs = () => {
    return AxiosInstance.get("/staff")
}

export const createStaff = (dataRequest: any) => {
    return AxiosInstance.post("/staff", dataRequest)
}

export const updateStaff = (dataRequest: any) => {
    return AxiosInstance.put("/staff", dataRequest)
}

export const deleteStaff = (staffId: string) => {
    return AxiosInstance.delete(`/staff?id=${staffId}`)
}
// Staff

// Customer
export const getCustomers = () => {
    return AxiosInstance.get("/customer")
}

export const createCustomer = (dataRequest: any) => {
    return AxiosInstance.post("/customer", dataRequest)
}

export const updateCustomer = (dataRequest: any) => {
    return AxiosInstance.put("/customer", dataRequest)
}

export const deleteCustomer = (customerId: string) => {
    return AxiosInstance.delete(`/customer?id=${customerId}`)
}
// Customer

// Product
export const getProducts = () => {
    return AxiosInstance.get("/product")
}

export const createProduct = (dataRequest: any) => {
    return AxiosInstance.post("/product", dataRequest)
}

export const updateProduct = (dataRequest: any) => {
    return AxiosInstance.put("/product", dataRequest)
}

export const deleteProduct = (productId: string) => {
    return AxiosInstance.delete(`/product?id=${productId}`)
}
// Product

// Order
export const getOrders = () => {
    return AxiosInstance.get("/order")
}

export const createOrder = (dataRequest: any) => {
    return AxiosInstance.post("/order", dataRequest)
}

export const updateOrder = (dataRequest: any) => {
    return AxiosInstance.put("/order", dataRequest)
}

export const deleteOrder = (orderId: string) => {
    return AxiosInstance.delete(`/order?id=${orderId}`)
}
// Order

// Invoice
export const getInvoices = () => {
    return AxiosInstance.get("/invoice")
}

export const createInvoice = (dataRequest: any) => {
    return AxiosInstance.post("/invoice", dataRequest)
}

export const updateInvoice = (dataRequest: any) => {
    return AxiosInstance.put("/invoice", dataRequest)
}

export const deleteInvoice = (invoiceId: string) => {
    return AxiosInstance.delete(`/invoice?id=${invoiceId}`)
}
// Invoice

// Revenue
export const getRevenues = () => {
    return AxiosInstance.get("/revenue")
}

export const createRevenue = (dataRequest: any) => {
    return AxiosInstance.post("/revenue", dataRequest)
}

export const updateRevenue = (dataRequest: any) => {
    return AxiosInstance.put("/revenue", dataRequest)
}

export const deleteRevenue = (revenueId: string) => {
    return AxiosInstance.delete(`/revenue?id=${revenueId}`)
}
// Revenue

// Inventory
export const getInventorys = () => {
    return AxiosInstance.get("/inventory")
}

export const createInventory = (dataRequest: any) => {
    return AxiosInstance.post("/inventory", dataRequest)
}

export const updateInventory = (dataRequest: any) => {
    return AxiosInstance.put("/inventory", dataRequest)
}

export const deleteInventory = (inventoryId: string) => {
    return AxiosInstance.delete(`/inventory?id=${inventoryId}`)
}
// Inventory