const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("front")
        .setDescription(
            "Move uma música para o primeiro da fila"
        )
        .addStringOption((option) =>
            option
                .setName("position")
                .setDescription(
                    "A posição na fila da musica que você deseja mover para frente (A queue/fila começa na posição 1)"
                )
                .setRequired(true)
        ),
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        const songPosition =
            Number(interaction.options.getString("position", true)) - 1;
        if (!queue) {
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            "A fila está vazia, adicione algumas músicas a ela!"
                        )
                        .setColor("e8d5ac"),
                ],
            });
        }
        try {
            if (songPosition < queue.getSize()) {
                const song = queue.tracks.toArray()[songPosition];
                queue.insertTrack(song, 0);
                return await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                `A música **${song.title}** foi movida para a primeira posição da fila!`
                            )
                            .setColor("e8d5ac"),
                    ],
                });
            } else {
                return await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                "Não existe essa posição na fila!"
                            )
                            .setColor("e8d5ac"),
                    ],
                });
            }
        } catch (e) {
            return await interaction.reply(`Algo deu errado!\n ${e}`);
        }
    },
};
