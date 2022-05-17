const API = process.env.NEXT_PUBLIC_API_URL; 
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
  }, 
  products: {
    get: id=> `${API}/api/${VERSION}/products/${id}`,
    list: `${API}/api/${VERSION}/products`,
    paginate: (limit=10, offset=1)=> `${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
    create: `${API}/api/${VERSION}/products`,
    update: id=> `${API}/api/${VERSION}/products/${id}`,
    delete: id=> `${API}/api/${VERSION}/products/${id}`,
  },
  categories: {
    list: `${API}/api/${VERSION}/categories`,
    create: `${API}/api/${VERSION}/categories`,
    get: id=> `${API}/api/${VERSION}/categories/${id}`,
    update: id=> `${API}/api/${VERSION}/categories/${id}`,
    categoryProducts: id=> `${API}/api/${VERSION}/categories/${id}/products`,
  },
  files: {
    upload: `${API}/api/${VERSION}/files/upload`,
    get: filename=> `${API}/api/${VERSION}/files/${filename}`,
  },
  users: {
    list: `${API}/api/${VERSION}/users`,
    create: `${API}/api/${VERSION}/users`,
    isAvailable: `${API}/api/${VERSION}/users/is-available/`,
  },
}; export default endPoints;