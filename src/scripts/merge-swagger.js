const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');

// Adjust the path to the swagger directory
const swaggerDir = path.join(__dirname, '../swagger');
const outputFile = path.join(swaggerDir, 'swagger.yaml');

// Read index.yaml
const indexFile = path.join(swaggerDir, 'index.yaml');
const indexContent = fs.readFileSync(indexFile, 'utf8');
const swaggerDoc = YAML.parse(indexContent);

// Initialize paths and components if not present
swaggerDoc.paths = swaggerDoc.paths || {};
swaggerDoc.components = swaggerDoc.components || {};
swaggerDoc.components.schemas = swaggerDoc.components.schemas || {};
swaggerDoc.components.securitySchemes = swaggerDoc.components.securitySchemes || {};

// List of resource files
const resourceFiles = ['products.yaml', 'categories.yaml', 'users.yaml', 'orders.yaml'];

resourceFiles.forEach((file) => {
  const filePath = path.join(swaggerDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const doc = YAML.parse(content);

  // Merge paths
  if (doc.paths) {
    Object.assign(swaggerDoc.paths, doc.paths);
  }

  // Merge components
  if (doc.components) {
    // Merge schemas
    if (doc.components.schemas) {
      Object.assign(swaggerDoc.components.schemas, doc.components.schemas);
    }
    // Merge securitySchemes
    if (doc.components.securitySchemes) {
      Object.assign(swaggerDoc.components.securitySchemes, doc.components.securitySchemes);
    }
  }
});

const outputContent = YAML.stringify(swaggerDoc, 10);
fs.writeFileSync(outputFile, outputContent, 'utf8');

console.log('Swagger files merged successfully.');
