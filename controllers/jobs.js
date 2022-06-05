const getAllJobs = async (req, res) => {
  res.send("loasdsgin user");
};
const getJob = async (req, res) => {
  res.send("login user");
};
const createJob = async (req, res) => {
  console.log(req.user);
  res.json(req.user);
};
const updateJob = async (req, res) => {
  res.send("login user");
};
const deleteJob = async (req, res) => {
  res.send("login user");
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
