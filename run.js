var fs = require('fs'),
    path = require('path');


const SCANNING_PATH = './src';
const REPLACE_TS_FILE_WITH_JS = true;
const TYPE_SCRIPT_EXT = '.ts'; /* OR .tsx*/

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function(name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

walkSync(SCANNING_PATH, function(filePath, stat) {
    var FilePath = path.join(__dirname, filePath);

    fs.readFile(FilePath, {
        encoding: 'utf-8'
    }, async function(err, codes) {
        if (!err) {

            var chunk = [];
            try {
                chunk = filePath.split('/').pop().split();
            } catch (error) {}


            if (void 0 !== chunk && chunk.length == 2) {
                var newFileName = chunk[0],
                    PathChunk = filePath.split(newFileName + TYPE_SCRIPT_EXT);
                if (PathChunk && PathChunk.length > 0) {
                    var writeFile = PathChunk[0] + newFileName;
                    console.log(writeFile+TYPE_SCRIPT_EXT+' =>> '+writeFile+'.js')
                    var convertee = await require("@babel/core").transformSync(codes, {
                        plugins: ["@babel/plugin-transform-typescript"],
                    });
                    (
                        convertee &&
                        'code' in convertee &&
                        (
                            fs.writeFile(writeFile + '.js', convertee.code, 'utf8', function(err) {
                                if (err) {
                                    return console.log(err);
                                }
                                if (REPLACE_TS_FILE_WITH_JS) {
                                    try {
                                        fs.unlinkSync(writeFile + '.ts')
                                    } catch (err) {
                                        console.error(err)
                                    }

                                }
                            })
                        )
                    )
                }
            }
        } else {
            console.log(err);
        }
    });

});