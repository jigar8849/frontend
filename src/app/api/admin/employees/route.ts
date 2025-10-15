import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'role', 'contact', 'salary', 'join_date', 'location', 'status'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    // Call backend API
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/admin/addNewEmployee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for session authentication
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Backend error' }));
      return NextResponse.json({ error: errorData.error || `Backend error: ${response.status}` }, { status: response.status });
    }

    const result = await response.json().catch(() => ({ message: 'Employee added successfully' }));

    return NextResponse.json({ message: result.message || 'Employee added successfully' });
  } catch (error) {
    console.error('Error adding employee:', error);
    return NextResponse.json({ error: 'Failed to add employee' }, { status: 500 });
  }
}
