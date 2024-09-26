const defaultCommitFunctions = require('@changesets/cli/commit').default;

/**
 *
 * @type {import('@changesets/types').GetAddMessage}
 */
const getAddMessage = async (changeset, options) => {
    const skipCI = options?.skipCI === 'add' || options?.skipCI === true;

    return `${changeset.summary}${skipCI ? '\n\n[skip ci]\n' : ''}`;
};

module.exports = {
    ...defaultCommitFunctions,
    getAddMessage,
};
