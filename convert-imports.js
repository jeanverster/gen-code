const fs = require("fs");
const path = require("path");

// Configuration
const sourceDir = "./components"; // Change this to your source directory
const fileExtensions = [".js", ".jsx", ".ts", ".tsx"]; // Files to process

// Process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    const newContent = content.replace(
      /import \* as (\w+) from ['"]@radix-ui\/react-([\w-]+)['"];/g,
      (match, alias, component) => {
        // Capitalize each part of the component name (handling hyphenated names)
        const capitalizedComponent = component
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("");
        return `import { ${capitalizedComponent} as ${alias} } from 'radix-ui';`;
      }
    );

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (err) {
    console.error(`❌ Error processing ${filePath}:`, err);
    return false;
  }
}

// Walk through directory recursively
function processDirectory(dir) {
  let updatedFiles = 0;

  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Skip node_modules and other common directories to ignore
        if (
          file !== "node_modules" &&
          file !== ".git" &&
          file !== "dist" &&
          file !== "build"
        ) {
          walk(filePath);
        }
      } else if (
        stat.isFile() &&
        fileExtensions.includes(path.extname(filePath))
      ) {
        if (processFile(filePath)) {
          updatedFiles++;
        }
      }
    }
  }

  walk(dir);
  return updatedFiles;
}

// Main function
function main() {
  console.log("🔍 Starting Radix UI import conversion...");

  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Source directory '${sourceDir}' does not exist!`);
    return;
  }

  const startTime = Date.now();
  const updatedFiles = processDirectory(sourceDir);
  const endTime = Date.now();

  console.log(`\n✨ Conversion complete!`);
  console.log(`📊 Updated ${updatedFiles} files`);
  console.log(`⏱️ Time taken: ${(endTime - startTime) / 1000} seconds`);
}

// Run the script
main();
