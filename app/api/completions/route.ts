import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { challenges } from '@/lib/challenges';

export async function POST(request: Request) {
  try {
    const { challenge_index, completion_time } = await request.json();
    
    // Validate that challenge_index is valid
    if (typeof challenge_index !== 'number' || challenge_index < 0 || challenge_index >= challenges.length) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid challenge index' 
      }, { status: 400 });
    }
    
    // Validate that completion_time is not negative
    if (completion_time < 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Completion time cannot be negative' 
      }, { status: 400 });
    }
    
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