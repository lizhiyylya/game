#! /bin/bash

CURRENT_DIR=`dirname $0`

# input paths
IMAGE_DIR=$CURRENT_DIR/../../tp/resources
BIG_IMAGE_DIR=$CURRENT_DIR/../../tp/bigImage/
# path that game proj use
GAME_IMAGE_PATH=$CURRENT_DIR/../../assets/resources/image/tplist

GAME_BG_PATH=$CURRENT_DIR/../../assets/resources/image/bigImage


# temporary path to place the sprite sheets
OUTPUT_PATH=$CURRENT_DIR/spriteSheets
OUTPUT_PATH_PVR=$OUTPUT_PATH/packagedPVR
OUTPUT_PATH_PNG=$OUTPUT_PATH/packagedPNG
# path of the texture packer command line tool
TP=/usr/local/bin/TexturePacker

# $1: Source Directory where the assets are located
# $2: Output File Name without extension
# $3: RGB Quality factor
# $4: Scale factor
# $5: Max-Size factor
# $6: Texture Type (PNG, PVR.CCZ)
# $7: Texture format
pack_textures() {

    ${TP} --smart-update \
        --texture-format $7 \
        --format cocos2d \
        --data "$2".plist \
        --sheet "$2".$6 \
        --maxrects-heuristics best \
        --enable-rotation \
        --scale $4 \
        --shape-padding 1 \
        --max-size $5 \
        --opt "$3" \
        --trim \
        $1/*.png 

}

# check the output path

if [ -d $OUTPUT_PATH ];then
    :
else
    mkdir $OUTPUT_PATH
fi

if [ -d $OUTPUT_PATH_PVR ]
then
    :
else
    mkdir $OUTPUT_PATH_PVR
fi

if [ -d $OUTPUT_PATH_PNG ]
then
    :
else
    mkdir $OUTPUT_PATH_PNG
fi

# do the job
for i in $IMAGE_DIR/*
do
    if [ -d $i ] 
    then
        spriteSheetName=`basename $i`
        pack_textures $i $OUTPUT_PATH_PNG/$spriteSheetName 'RGBA8888' 1 2048 'png' "png"
        pack_textures $i $OUTPUT_PATH_PVR/$spriteSheetName 'RGBA8888' 1 2048 'pvr.ccz' "pvr2ccz"
    fi
done

# cp them to the game proj image path

echo $GAME_IMAGE_PATH
cp -f $OUTPUT_PATH_PNG/* $GAME_IMAGE_PATH
cp -f $BIG_IMAGE_DIR/* $GAME_BG_PATH