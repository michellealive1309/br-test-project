<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\CreateCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Tag(name: "Customers", description: "API Endpoints for Customer Management")]
class CustomerController extends ApiController
{
    #[OA\Get(
        path: '/api/customers',
        summary: 'Get paginated list of customers',
        tags: ['Customers'],
        parameters: [
            new OA\Parameter(name: 'page', in: 'query', description: 'Page number', schema: new OA\Schema(type: 'integer', default: 1)),
            new OA\Parameter(name: 'limit', in: 'query', description: 'Items per page', schema: new OA\Schema(type: 'integer', default: 10))
        ],
        responses: [
            new OA\Response(response: 200, description: 'Successful operation'),
            new OA\Response(response: 400, description: 'Bad Request')
        ]
    )]
    public function index(Request $request)
    {
        $validated = $request->validate([
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:1000',
        ]);

        [$page, $limit] = [$validated['page'] ?? 1, $validated['limit'] ?? 10];
        $customers = Customer::offset(--$page * $limit)->limit($limit)->get();

        return ApiResponse::success($customers);
    }

    #[OA\Get(
        path: '/api/customers/{id}',
        summary: 'Get customer details',
        tags: ['Customers'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, description: 'Customer ID', schema: new OA\Schema(type: 'string'))
        ],
        responses: [
            new OA\Response(response: 200, description: 'Successful operation'),
            new OA\Response(response: 404, description: 'Customer not found')
        ]
    )]
    public function show(string $id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return ApiResponse::error('Customer not found', null, 404);
        }

        return ApiResponse::success($customer);
    }

    #[OA\Get(
        path: '/api/customers/list',
        summary: 'Get simplified customer list (ID and Name only)',
        tags: ['Customers'],
        responses: [
            new OA\Response(response: 200, description: 'Successful operation')
        ]
    )]
    public function list()
    {
        $customerList = Customer::select('id', 'name')->limit(100)->get();

        return ApiResponse::success($customerList);
    }

    #[OA\Post(
        path: '/api/customers',
        summary: 'Create a new customer',
        tags: ['Customers'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: '#/components/schemas/Customer')
        ),
        responses: [
            new OA\Response(response: 201, description: 'Created'),
            new OA\Response(response: 400, description: 'Bad Request')
        ]
    )]
    public function store(CreateCustomerRequest $request)
    {
        $validated = $request->validated();

        $customer = Customer::create($validated);

        return ApiResponse::success($customer);
    }

    #[OA\Put(
        path: '/api/customers/{id}',
        summary: 'Update an existing customer',
        tags: ['Customers'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'string'))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: '#/components/schemas/Customer')
        ),
        responses: [
            new OA\Response(response: 200, description: 'Updated'),
            new OA\Response(response: 400, description: 'Bad Request'),
            new OA\Response(response: 404, description: 'Customer not found')
        ]
    )]
    public function update(UpdateCustomerRequest $request, string $id)
    {
        $validated = $request->validated();

        $customer = Customer::find($id);
        if (!$customer) {
            return ApiResponse::error('Customer not found', null, 404);
        }

        $customer->update($validated);

        return ApiResponse::success($customer);
    }

    #[OA\Delete(
        path: '/api/customers/{id}',
        summary: 'Delete a customer',
        tags: ['Customers'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'string'))
        ],
        responses: [
            new OA\Response(response: 204, description: 'Deleted successfully'),
            new OA\Response(response: 404, description: 'Customer not found')
        ]
    )]
    public function destroy(string $id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return ApiResponse::error('Customer not found', null, 404);
        }

        $customer->delete();

        return ApiResponse::success($customer, 'Customer has been deleted');
    }
}
