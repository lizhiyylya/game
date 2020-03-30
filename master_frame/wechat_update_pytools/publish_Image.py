# -*- coding:utf-8 -*-
import os, re , shutil
import texturepack
from makeZip import fshelper

STRICT = False
SCHEME_PATH = ""
PUBLISH_PATH = ""
PUBLISERS = {}
def publish(schemename):
    SCHEME_PATH = fshelper.getAbsFromRelative(__file__,'..' ,schemename)
    PUBLISH_PATH = fshelper.getAbsFromRelative(__file__, 'texturePacker')
        # dirname : (publisher, dstDir, strategy)
    PUBLISERS = {
        'dd1': (doPublishImgSrc, 'plist', 'overwrite'),
    }

    doPublishImgSrc(os.path.join(SCHEME_PATH, 'aa'),'plist',os.path.join(PUBLISH_PATH, 'plist'))
    # for d in fshelper.listdir(SCHEME_PATH):
    #     if STRICT:
    #         assert os.path.isdir(d)
    #     if (os.path.isdir(os.path.join(SCHEME_PATH, d))):
    #         for sub in fshelper.listdir(os.path.join(SCHEME_PATH, d)):
    #             if sub in PUBLISERS:
    #                 publisher, dstDir, policy = PUBLISERS[sub]
    #                 assert policy in ['overwrite', 'merge']
    #                 if policy == 'overwrite' and os.path.isdir(os.path.join(PUBLISH_PATH, d, dstDir)):
    #                     shutil.rmtree(os.path.join(PUBLISH_PATH, d, dstDir))
    #
    #                 publisher(d, sub, dstDir)


# def getDir(dir):
#     if(not os.path.isdir(dir)):
#         return
#     for d in fshelper.listdir(dir):
#         for sub in fshelper.listdir(os.path.join(SCHEME_PATH, d)):
#             if (os.path.splitext(sub)[1] == '.png'):
#
#                 publisher, dstDir, policy = PUBLISERS[sub]
#                 assert policy in ['overwrite', 'merge']
#                 if policy == 'overwrite' and os.path.isdir(os.path.join(PUBLISH_PATH, d, dstDir)):
#                     shutil.rmtree(os.path.join(PUBLISH_PATH, d, dstDir))
#                 publisher(d, sub, dstDir)

def doPublishImgSrc(categoryDir, _, dstDir):
    imgAbsPath = os.path.join(SCHEME_PATH, categoryDir, 'dd1')
    tpsList = []
    _tpsNameList = []

    _checkParticleImgs(imgAbsPath)

    for d in fshelper.listdir(imgAbsPath):
        if d == 'tps':
            assert os.path.isdir(os.path.join(imgAbsPath, d))
            for tps in fshelper.listdir(os.path.join(imgAbsPath, d)):
                assert os.path.splitext(tps)[1] == '.tps'
                _tpsNameList.append(os.path.splitext(tps)[0])

    for d in fshelper.listdir(imgAbsPath):
        pTmp = os.path.join(imgAbsPath, d)
        if d in ['nopack', 'font', 'shader', 'hall_bg_effect']:
            assert os.path.isdir(pTmp)
            fshelper.copytree(pTmp, os.path.join(PUBLISH_PATH, categoryDir, dstDir, d),
                              deleteIfExist=True)
        elif d == 'tps':
            assert os.path.isdir(pTmp)
            for tps in fshelper.listdir(pTmp):
                assert os.path.splitext(tps)[1] == '.tps'
                tpsList.append(tps)
        elif os.path.isfile(pTmp):
            fshelper.copyfile(pTmp, os.path.join(PUBLISH_PATH, categoryDir, dstDir, d))

    for tps in tpsList:
        _doExportTps(os.path.join(imgAbsPath, 'tps', tps),
                     os.path.join(PUBLISH_PATH, categoryDir, 'img'))


def _checkParticleImgs(imgAbsPath):
    particlePath = os.path.join(imgAbsPath, 'nopack', 'particle_effects')
    badList = []
    if os.path.isdir(particlePath):
        for img in fshelper.listdir(particlePath):
            ext = os.path.splitext(img)[1]
            if ext != '.png':
                badList.append(img)
    if badList:
        msg = repr(badList)
        raise Exception('bad particle img format => %s' % msg)

def _doExportTps(tpsFilePath, outputPath):
    assert os.path.isfile(tpsFilePath)

    n = fshelper.getNameWithoutExtension(tpsFilePath)
    outPngPath = os.path.join(outputPath, n + '.png')
    outPlistPath = os.path.join(outputPath, n + '.plist')
    texturepack.texturepack(tpsFilePath, outPngPath, outPlistPath)

if __name__ == '__main__':
    # publish('tp_list/image')
    publish('testImage')