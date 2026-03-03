

const DISCORD_API = "https://discord.com/api/v10";

async function deleteUserMessages(guildId, userId, botToken) {
    console.log("=== DELETE USER MESSAGES START ===");
    console.log("Guild:", guildId);
    console.log("User:", userId);

    const oneHourAgoDate = new Date(Date.now() - 60 * 60 * 1000);
    console.log("Time threshold:", oneHourAgoDate.toISOString());

    const searchUrl = new URL(`${DISCORD_API}/guilds/${guildId}/messages/search`);
    searchUrl.searchParams.append("author_id[]", userId);
        searchUrl.searchParams.append("limit", "15");

    console.log("Search URL:", searchUrl.toString());

    let deletedCount = 0;

    try {
        const searchResponse = await fetch(searchUrl, {
            headers: {
                "Authorization": `Bot ${botToken}`
            }
        });

        console.log("Search status:", searchResponse.status);

        if (!searchResponse.ok) {
            const errorText = await searchResponse.text();
            console.error("Search failed:", errorText);
            return;
        }

        const searchData = await searchResponse.json();

        if (!searchData.messages || searchData.messages.length === 0) {
            console.log("No messages found.");
            return;
        }

        console.log("Raw message groups:", searchData.messages.length);

        for (const messageGroup of searchData.messages) {
            for (const message of messageGroup) {

                const messageDate = new Date(message.timestamp);
                console.log(`Checking message ${message.id} | ${messageDate.toISOString()}`);

                if (messageDate >= oneHourAgoDate) {
                    console.log(`Deleting message ${message.id} in channel ${message.channel_id}`);

                    const deleteResponse = await fetch(
                        `${DISCORD_API}/channels/${message.channel_id}/messages/${message.id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Authorization": `Bot ${botToken}`
                            }
                        }
                    );

                    if (deleteResponse.ok) {
                        console.log(`Deleted message ${message.id}`);
                        deletedCount++;
                    } else {
                        const deleteError = await deleteResponse.text();
                        console.error(`Failed to delete ${message.id}:`, deleteError);
                    }
                } else {
                    console.log(`Skipped (older than 1 hour): ${message.id}`);
                }
            }
        }

        console.log("Total deleted:", deletedCount);
        console.log("=== DELETE USER MESSAGES END ===");

    } catch (error) {
        console.error("Unexpected error:", error);
    }
}
module.exports = { deleteUserMessages };