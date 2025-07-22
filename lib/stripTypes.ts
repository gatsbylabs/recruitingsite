export function stripTypeScript(code: string): string {
  // Remove type annotations and TypeScript-specific syntax
  let stripped = code;
  
  // Remove type annotations from parameters and return types
  stripped = stripped.replace(/:\s*\w+(\[\])?(\s*\|\s*\w+(\[\])?)*/g, '');
  
  // Remove generic type parameters
  stripped = stripped.replace(/<[^>]+>/g, '');
  
  // Remove interface and type declarations
  stripped = stripped.replace(/^(\s*)(interface|type)\s+\w+\s*=?\s*{[^}]*}/gm, '');
  
  // Remove 'as' type assertions
  stripped = stripped.replace(/\s+as\s+\w+(\[\])?/g, '');
  
  // Remove readonly modifiers
  stripped = stripped.replace(/\breadonly\s+/g, '');
  
  // Remove public/private/protected modifiers
  stripped = stripped.replace(/\b(public|private|protected)\s+/g, '');
  
  // Remove declare statements
  stripped = stripped.replace(/^(\s*)declare\s+/gm, '$1');
  
  // Remove export/import type
  stripped = stripped.replace(/\b(export|import)\s+type\s+/g, '$1 ');
  
  return stripped;
}