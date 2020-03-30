# -*- coding:utf-8 -*-

import os, re
from makeZip import fshelper, suger,externalcall

TPS_FILEPATH_PATTERN = re.compile(r'<key>fileList</key>\n *<array>\n *<filename>([^<]*)</filename>\n *</array>')


def texturepack(tpsPath, pngPath, plistPath):
    assert os.path.isfile(tpsPath)

    md5List = []
    with open(tpsPath, 'r') as f:
        fc = f.read()
        md5List.append(suger.md5(fc))
    match = TPS_FILEPATH_PATTERN.findall(fc)
    assert len(match) == 1

    p = fshelper.getAbsFromRelative(tpsPath, match[0])
    for fn in fshelper.collectAllFiles(p):
        with open(fn, 'r') as f:
            md5List.append(suger.md5(fn))
            md5List.append(suger.md5(f.read()))
    m = suger.md5('_'.join(md5List))
    cachePrefix = fshelper.getAbsFromRelative(__file__, '..', '__cache__', 'export_tps', m[0:2], m[2:4], m)

    if os.path.isfile(cachePrefix + '.png') and os.path.isfile(cachePrefix + '.plist'):
        fshelper.copyfile(cachePrefix + '.png', pngPath)
        fshelper.copyfile(cachePrefix + '.plist', plistPath)
    else:
        shcmd = 'TexturePacker %s --sheet %s --data %s' % (tpsPath, pngPath, plistPath)
        externalcall.callShellCommand(shcmd)

        _doRegulatePlistFile(plistPath)
        fshelper.copyfile(pngPath, cachePrefix + '.png')
        fshelper.copyfile(plistPath, cachePrefix + '.plist')


def _doRegulatePlistFile(plistPath):
    fixed = '<string>$TexturePacker:SmartUpdate:00000000000000000000000000000000:1/1$</string>\n'
    assert os.path.isfile(plistPath)
    with open(plistPath, 'r') as f:
        lines = f.readlines()
    for i in range(len(lines)):
        pos = lines[i].find('<string>$TexturePacker:SmartUpdate:')
        if pos != -1:
            lines[i] = lines[i][:pos] + fixed
    with open(plistPath, 'w') as f:
        f.writelines(lines)
