import type { FlagInfo } from './types';

const isNotStableBuild = runtimeConfig.appBuildType !== 'stable';
const isDesktopEnvironment = environment.isElectron;
const isCanaryBuild = runtimeConfig.appBuildType === 'canary';

export const AFFINE_FLAGS = {
  enable_database_attachment_note: {
    category: 'blocksuite',
    bsFlag: 'enable_database_attachment_note',
    displayName: 'Database Attachment Note',
    description: 'Allows adding notes to database attachments.',
    configurable: isNotStableBuild,
  },
  enable_block_query: {
    category: 'blocksuite',
    bsFlag: 'enable_block_query',
    displayName: 'Todo Block Query',
    description: 'Enables querying of todo blocks.',
    configurable: isNotStableBuild,
  },
  enable_synced_doc_block: {
    category: 'blocksuite',
    bsFlag: 'enable_synced_doc_block',
    displayName: 'Synced Doc Block',
    description: 'Enables syncing of doc blocks.',
    configurable: false,
    defaultState: true,
  },
  enable_edgeless_text: {
    category: 'blocksuite',
    bsFlag: 'enable_edgeless_text',
    displayName: 'Edgeless Text',
    description: 'Enables edgeless text blocks.',
    configurable: false,
    defaultState: true,
  },
  enable_color_picker: {
    category: 'blocksuite',
    bsFlag: 'enable_color_picker',
    displayName: 'Color Picker',
    description: 'Enables color picker blocks.',
    configurable: false,
    defaultState: true,
  },
  enable_ai_chat_block: {
    category: 'blocksuite',
    bsFlag: 'enable_ai_chat_block',
    displayName: 'AI Chat Block',
    description: 'Enables AI chat blocks.',
    configurable: false,
    defaultState: true,
  },
  enable_ai_onboarding: {
    category: 'blocksuite',
    bsFlag: 'enable_ai_onboarding',
    displayName: 'AI Onboarding',
    description: 'Enables AI onboarding.',
    configurable: false,
    defaultState: true,
  },
  enable_multi_view: {
    category: 'affine',
    displayName: 'Split View',
    description:
      'The Split View feature enables you to divide your tab into multiple sections for simultaneous viewing and editing of different documents.',
    feedbackType: 'discord',
    feedbackLink:
      'https://discord.com/channels/959027316334407691/1280009690004324405',
    configurable: isDesktopEnvironment,
    defaultState: isCanaryBuild,
  },
  enable_emoji_folder_icon: {
    category: 'affine',
    displayName: 'Emoji Folder Icon',
    description:
      'Once enabled, you can use an emoji as the folder icon. When the first character of the folder name is an emoji, it will be extracted and used as its icon.',
    feedbackType: 'discord',
    feedbackLink:
      'https://discord.com/channels/959027316334407691/1280014319865696351/1280014319865696351',
    configurable: true,
    defaultState: false,
  },
  enable_editor_settings: {
    category: 'affine',
    displayName: 'Editor Settings',
    description: 'Enables editor settings.',
    configurable: isNotStableBuild,
    defaultState: isNotStableBuild,
  },
  enable_offline_mode: {
    category: 'affine',
    displayName: 'Offline Mode',
    description: 'Enables offline mode.',
    configurable: isDesktopEnvironment,
    defaultState: false,
  },
} satisfies { [key in string]: FlagInfo };

export type AFFINE_FLAGS = typeof AFFINE_FLAGS;
