export const codeExamples: Record<string, string> = {
  JavaScript: `// A simple function to calculate Fibonacci numbers
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 Fibonacci numbers
const results = Array.from({ length: 10 }, (_, i) => fibonacci(i));
console.log("First 10 Fibonacci numbers:", results);`,

  Python: `# A simple function to calculate Fibonacci numbers
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Calculate first 10 Fibonacci numbers
results = [fibonacci(i) for i in range(10)]
print("First 10 Fibonacci numbers:", results)`,

  TypeScript: `// A simple function to calculate Fibonacci numbers
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 Fibonacci numbers
const results: number[] = Array.from(
  { length: 10 }, 
  (_, i) => fibonacci(i)
);
console.log("First 10 Fibonacci numbers:", results);`,

  Java: `public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        System.out.println("First 10 Fibonacci numbers:");
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
    }
}`,

  "C++": `#include <iostream>
#include <vector>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    std::cout << "First 10 Fibonacci numbers:\\n";
    for (int i = 0; i < 10; i++) {
        std::cout << fibonacci(i) << " ";
    }
    return 0;
}`,

  Ruby: `# A simple function to calculate Fibonacci numbers
def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end

# Calculate first 10 Fibonacci numbers
results = (0..9).map { |i| fibonacci(i) }
puts "First 10 Fibonacci numbers: #{results.join(', ')}"`,

  Go: `package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    fmt.Println("First 10 Fibonacci numbers:")
    for i := 0; i < 10; i++ {
        fmt.Printf("%d ", fibonacci(i))
    }
}`
};