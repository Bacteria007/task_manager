const customReferences = require('./src/references/custom_refs');

customReferences.app.listen(8881, () => {
  console.log(`Server is running on port 8881`);
});
