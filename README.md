# Terminal Recruiting Site

A retro-themed recruiting platform with TypeScript coding challenges built with Next.js. Candidates must solve programming puzzles to access job listings.

## Features

- **1970s Terminal Aesthetic**: Monochrome beige color palette with Golos Text font
- **Interactive Coding Challenges**: Three TypeScript puzzles of increasing difficulty
- **Real-time Code Editor**: Monaco editor with syntax highlighting
- **Performance Tracking**: Completion times stored in Supabase with distribution graphs
- **Animated Transitions**: Smooth animations between challenge completions

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Editor**: Monaco Editor
- **Database**: Supabase (PostgreSQL)
- **Type Stripping**: ts-blank-space

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd recruitingsite
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new Supabase project at https://supabase.com
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
   - Copy your project URL and anon key

4. Configure environment variables:
```bash
# Copy the example env file
cp .env.local.example .env.local

# Edit .env.local with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
recruitingsite/
├── app/
│   ├── api/
│   │   └── completions/    # API routes for completion times
│   ├── jobs/              # Job listings page
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main landing page
├── components/
│   ├── CodeEditor.tsx     # Monaco editor with test runner
│   ├── CompletionGraph.tsx # Time distribution visualization
│   └── Timer.tsx          # Challenge timer
├── lib/
│   ├── challenges.ts      # Coding challenge definitions
│   ├── stripTypes.ts      # TypeScript type removal
│   └── supabase.ts        # Supabase client
└── public/                # Static assets
```

## Challenges

1. **Array Deduplication**: Remove duplicates while preserving order
2. **Binary Search**: Find target value in sorted array
3. **Promise Race Condition**: Handle async operations with timeout

## Customization

### Adding New Challenges

Edit `lib/challenges.ts` to add new puzzles:

```typescript
{
  title: "CHALLENGE NAME",
  description: "Challenge description",
  signature: "function signature",
  starterCode: "initial code template",
  tests: [
    { input: [args], expected: output },
    // more test cases
  ]
}
```

### Styling

- Colors defined in `tailwind.config.ts` under `terminal` theme
- Animations in `app/globals.css`
- Font loaded from Google Fonts

## Database Schema

The `completion_times` table tracks user performance:

```sql
CREATE TABLE completion_times (
  id UUID PRIMARY KEY,
  challenge_index INTEGER NOT NULL,
  completion_time INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Vercel:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT