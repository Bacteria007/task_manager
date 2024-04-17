const { app } = require('./src/references/custom_refs');
require("./src/database/config")
const authentication = require('./src/controllers/auth_controller');
const taskController = require('./src/controllers/task_controller');

app.use("/auth", authentication)
app.use("/task", taskController)

app.listen(8881, () => {
  console.log(`Server is running on port 8881`);
});
