import tsBlankSpace from 'ts-blank-space';

export function stripTypeScript(code: string): string {
  try {
    // ts-blank-space replaces TypeScript syntax with whitespace
    // This preserves line numbers and column positions
    const result = tsBlankSpace(code);
    return result;
  } catch (error) {
    // If parsing fails, return the original code
    console.error('Failed to parse TypeScript:', error);
    return code;
  }
}