const { CommandInteraction, Client, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { translate } = require('@vitalets/google-translate-api');

module.exports = {
    name: 'translate',
    description: 'Translate',
    options: [
        {
            name: 'text',
            description: 'Text to translate',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'language',
            description: 'Translate language',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'EN', value: 'EN'
                },
                {
                    name: 'CH', value: 'CH'
                }
            ]
        }
    ],
    type: 1,
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const language = interaction.options.getString('language');
        const text = interaction.options.getString('text');
        if (language === 'EN') {
            const translated = await translate(text, { to: 'en' });
            interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
                        .setTitle('zh-TW -> EN')
                        .setDescription(translated.text)
                        .setColor('White')
                ]
            });
        }
        else if (language === 'CH') {
            const translated = await translate(text, { to: 'zh-TW' });
            interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
                        .setTitle('EN -> zh-TW')
                        .setDescription(translated.text)
                        .setColor('White')
                ]
            });
        }
    }
}