<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:1000',
        ]);

        [$page, $limit] = [$validated['page'] ?? 1, $validated['limit'] ?? 10];

        return response()->json(Customer::paginate($limit, ['*'], 'page', $page));
    }

    public function show(string $id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        return response()->json($customer);
    }

    public function list()
    {
        $customerList = Customer::select('id', 'name')->limit(100)->get();

        return response()->json($customerList);
    }

    public function store(CreateCustomerRequest $request)
    {
        $validated = $request->validated();

        $customer = Customer::create($validated);

        return response()->json($customer, 201);
    }

    public function update(UpdateCustomerRequest $request, string $id)
    {
        $validated = $request->validated();

        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $customer->update($validated);

        return response()->json($customer);
    }

    public function destroy(string $id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $customer->delete();

        return response()->json(['message' => 'Deleted'], 204);
    }
}
