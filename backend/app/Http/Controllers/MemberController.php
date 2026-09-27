<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Member;

class MemberController extends Controller
{
    public function index()
    {
        return response()->json(Member::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:members',
            'address' => 'nullable|string',
            'role' => 'nullable|string',
            'status' => 'nullable|string',
            'joined_date' => 'nullable|date',
        ]);

        $member = Member::create($validated);
        return response()->json($member, 201);
    }

    public function show(Member $member)
    {
        return response()->json($member);
    }

    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:members,email,' . $member->id,
            'address' => 'nullable|string',
            'role' => 'nullable|string',
            'status' => 'nullable|string',
            'joined_date' => 'nullable|date',
        ]);

        $member->update($validated);
        return response()->json($member);
    }

    public function destroy(Member $member)
    {
        $member->delete();
        return response()->json(null, 204);
    }
}
