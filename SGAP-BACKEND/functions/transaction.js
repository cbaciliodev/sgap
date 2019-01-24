var mongoose = require('mongoose');

tx = {
    startSession: async function(){
        const session = await mongoose.startSession();
        session.startTransaction();
        return session;
    },
    commit: async function( _session ){
        await _session.commitTransaction();
        _session.endSession();
    },
    rollback: async function( _session ){
        await _session.abortTransaction();
        _session.endSession();
    },
}

module.exports.tx = tx;