module.exports = {
    apps: [
        {
            name: "stvdsbot",
            script: "deploy.sh",
            watch: false,
            exec_mode: "fork",
            autorestart: true,
        },
    ],
};
