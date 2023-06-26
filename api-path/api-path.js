var host = "https://digimart.samiur.me";

const V1API = {
    'get_login': host + '/api/auth/token',

    // User List
    'get_user_list': host + '/api/auth/user/list',

    // Category
    'get_category': host + '/api/product/category/list',
    'create_category': host + '/api/product/category/new',
    'edit_category': host + '/api/product/category/edit/',
    'delete_category': host + '/api/product/category/delete/',
    'toggle_category_status': host + '/api/product/category/status/',

    // Products
    'get_product': host + '/api/products/',
    'get_product_details': host + '/api/products/details/',
    'create_product': host + '/api/products/create',
    'edit_product': host + '/api/products/edit/', 
    'delete_product': host + '/api/products/delete/', 
    'toggle_product_status': host + '/api/products/status/',
    'toggle_product_featured': host + '/api/products/toggle-featured/',

    // Student's Products
    'get_students_product': host + '/api/products/user/list',
    'get_students_product_details': host + '/api/products/user/detail/',
    'edit_students_product': host + '/api/products/user/edit/', 
    'delete_students_product': host + '/api/products/user/delete/', 
    'toggle_students_product_status': host + '/api/products/user/available/toggle/',
    'toggle_students_product_approve': host + '/api/products/user/approve/toggle/',

    // Orders
    'get_orders': host + '/api/order/list',
    'toggle_order_status': host + '/api/order/edit-order-status/',
    'toggle_delivery_status': host + '/api/order/edit-delivery-status/',
}

export default V1API;