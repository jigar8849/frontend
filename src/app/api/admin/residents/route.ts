import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Fetch data from backend API
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/admin/api/residents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const residentsData = await response.json();

    // Map the data to match the frontend interface
    const residents = residentsData.map((resident: Record<string, any>) => ({
      id: resident._id.toString(),
      name: `${resident.first_name} ${resident.last_name}`,
      flat: `${resident.block}-${resident.flat_number}`,
      joined: resident.createdAt ? new Date(resident.createdAt).toISOString().split('T')[0] : 'N/A',
      email: resident.email,
      phone: resident.mobile_number.toString(),
      members: resident.number_of_member,
      vehicles: (resident.two_wheeler ? 1 : 0) + (resident.four_wheeler ? 1 : 0),
      status: resident.status === 'active' ? 'active' : 'inactive'
    }));

    return NextResponse.json(residents);
  } catch (error) {
    console.error('Error fetching residents:', error);
    return NextResponse.json({ error: 'Failed to fetch residents' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Get the id from the URL

    if (!id) {
      return NextResponse.json({ error: 'Resident ID is required' }, { status: 400 });
    }

    // Call backend DELETE API
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/admin/residents/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for session authentication
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    return NextResponse.json({ message: 'Resident deleted successfully' });
  } catch (error) {
    console.error('Error deleting resident:', error);
    return NextResponse.json({ error: 'Failed to delete resident' }, { status: 500 });
  }
}
