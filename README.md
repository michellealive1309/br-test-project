# Requirements  
  
## Customer Service (Laravel)  
✅ Customer APIs must be protected routes  
✅ Validation  
✅ Email is unique  
✅ Migration  
❌ Consistencies response format  
  
## Order Service (NestJS)  
✅ Order APIs must be protected routes  
✅ JWT Authentication  
✅ Check customer_id upon order creating  
✅ Calculate total_amount by quantity * price  
✅ Project structure followed NestJS standard  
✅ Validation and error handling  
❌ Migration  

## React + TypeScript Frontend (NextJS)  
### Required Page  
**Login Page**  
✅ 1. Form email  
✅ 2. Form password  
✅ 3. Login through Laravel API  
✅ 4. Stored JWT token for API call  
✅ 5. Show error message on login fail  
**Customer Page**  
✅ 1. Show customers list  
✅ 2. Able to add customer  
✅ 3. Call API from Laravel  
**Order Page**  
✅ 1. Show orders list  
✅ 2. Able to add order  
✅ 3. Able to add order  
✅ 4. Call API from NestJS  
✅ 5. Select customer on order creating  
### React Requirements  
✅ Use React + TypeScript  
✅ Arrange component  
✅ Arrange API call  
❌ Loading state  
❌ Error state  
✅ Protected login required route  

## Integration Requirement  
### When create order  
✅ 1. User login from react through Laravel  
✅ 2. Laravel return JWT token  
✅ 3. React use token request API  
✅ 4. NestJS verify JWT token  
✅ 5. NestJS verify customer_id existed on Laravel  
✅ 6. Return error if customer is not existed  
### JWT token verification  
✅ Shared JWT token between Laravel and NestJS  
❌ NestJS verify JWT token through Laravel  
  
### Other Requirement  
❌ API documentation - Swagger  