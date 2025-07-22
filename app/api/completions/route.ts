import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { challenge_index, completion_time } = await request.json();
    
    const { data, error } = await supabase
      .from('completion_times')
      .insert([{ challenge_index, completion_time }])
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const challengeIndex = searchParams.get('challenge_index');
    
    const { data, error } = await supabase
      .from('completion_times')
      .select('completion_time')
      .eq('challenge_index', challengeIndex)
      .order('completion_time', { ascending: true });
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}