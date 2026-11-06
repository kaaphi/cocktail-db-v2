#!/bin/bash
rm dist.tar.gz
npm run build
cd dist
tar czf ../cocktails-dist.tar.gz *
