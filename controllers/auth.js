
// Asynchronous I/O is a form of input/output processing that 
// permits other processing to continue before the transmission has finished.
export const users = async (req, res) => {
    res.json({
        data: 'Matthew under a router',
    });
};