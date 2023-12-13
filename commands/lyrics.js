const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
const { lyricsExtractor } = require("@discord-player/extractor");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("Mostra a letra da música que está sendo tocada!"),
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue) {
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder().setDescription(
                        "A fila está vazia! Por favor adicione alguma música!"
                    ),
                ],
            });
        }
        try {
            await interaction.deferReply();

            const lyricsFinder =
                lyricsExtractor(/* 'optional genius API key' */);

            const lyrics = await lyricsFinder
                .search(queue.currentTrack.title)
                .catch(() => null);
            if (!lyrics)
                return interaction.followUp({
                    content: "Não foram encontradas letras para essa música!",
                    ephemeral: false,
                });

            const trimmedLyrics = lyrics.lyrics.substring(0, 1997);

            const embed = new EmbedBuilder()
                .setTitle(lyrics.title)
                .setURL(lyrics.url)
                .setThumbnail(lyrics.thumbnail)
                .setAuthor({
                    name: lyrics.artist.name,
                    iconURL: lyrics.artist.image,
                    url: lyrics.artist.url,
                })
                .setDescription(
                    trimmedLyrics.length === 1997
                        ? `${trimmedLyrics}...`
                        : trimmedLyrics
                )
                .setColor("e8d5ac");

            return interaction.followUp({ embeds: [embed] });
        } catch (e) {
            return await interaction.reply(`Algo deu errado!\n ${e}`);
        }
    },
};
