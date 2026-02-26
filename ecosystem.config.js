module.exports = {
    apps: [
        {
            name: "stvbot",
            script: "deploy.sh",
            watch: false,
            exec_mode: "fork",
            autorestart: true,
        },
    ],
};
