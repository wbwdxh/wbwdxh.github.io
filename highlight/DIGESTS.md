## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
  integrity="sha384-xBsHBR6BS/LSlO3cOyY2D/4KkmaHjlNn3NnXUMFFc14HLZD7vwVgS3+6U/WkHAra"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"
  integrity="sha384-WmGkHEmwSI19EhTfO1nrSk3RziUQKRWg3vO0Ur3VYZjWvJRdRnX4/scQg+S2w1fI"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-+cjJSDOWSAbotsSXpQboVeVHgAguvM2DEPMB8jVhRAHSkx3tOhtw3kwIi6aLwrix /es/languages/accesslog.js
sha384-vx1I5PIkVSkAHbjcpmdlPQm/QmGrcmaqNFopgmjZIaCXdiSOxL84U6Vcccfmf+p8 /es/languages/accesslog.min.js
sha384-o2RvzuEpU78s+xoEWs/++kMfb71T2QoVpd5kcyephebSrCF7IBl82kpINu7hXFCB /es/languages/apache.js
sha384-T5Wi3CdvOgNTDa/TQF3guYZxiCaiLFKzgYxX57ZCt1rVax+G6GP9EOlNdg8spAUs /es/languages/apache.min.js
sha384-uBlc/xEFeDxZmBU7K/YWwi3ryXQrLQCAY2K1Dl3OD2DaAQBZZTt6Ew3aeDP20ix0 /es/languages/bash.js
sha384-4qer4rJCVxZjkwD4YaJfOnT2NOOt0qdjKYJM2076C+djiJ4lgrP1LVsB/MCpJSET /es/languages/bash.min.js
sha384-EwAFcMMnNYbOS/ABVtPlSLENfB27fQSxa/eUw9xWLejr7sWWPcICSoHJUxNVwhgI /es/languages/basic.js
sha384-3EDvjyClCK85gMCNUIHh/H9+K30vwYJjkGmjdUKpG6bGxahP+dSc+HRtXadT8eUD /es/languages/basic.min.js
sha384-0OZaeLK1yb5eP3nW4y0JP1fVharSrsuv/1mkI/6/8aRFm9laYIWIMXjCOqu+vRW5 /es/languages/c.js
sha384-G7WtwjMBNGrPly3ZsbPhfnT0v88hG3Ea9fQhrSWfzj7cNAsXsU7EKMQLyLGj7vTH /es/languages/c.min.js
sha384-Wjwd1YEG/PYlkLHTWIx+RlPK6XboMN3bEpveERJ8D8Z4RaNE02Ho19ZFrSRPGi0j /es/languages/cpp.js
sha384-Q4zTNH8WsDVdSZbiZtzWS1HmAUcvMSdTmth9Uqgfjmx7Qzw6B8E3lC9ieUbE/9u4 /es/languages/cpp.min.js
sha384-9wIkTclZvge1ETccmA35MA/ZoqO3Z9pxv9hFxaxHedJJFRj5qg5bEm5hCxyDc4wl /es/languages/csp.js
sha384-CMphVcj9wPdvpoNG/a3HS5RAI71czD/WkszUPkiEaiWf0fjZlWmTN/sThO5ZLVt3 /es/languages/csp.min.js
sha384-DA5ii4oN8R2fsamNkHOanSjuN4v7j5RIuheQqnxMQ4cFnfekeuhwu4IdNXiCf+UU /es/languages/css.js
sha384-OBugjfIr093hFCxTRdVfKH8Oe3yiBrS58bhyYYTUQJVobk6SUEjD7pnV8BPwsr8a /es/languages/css.min.js
sha384-xG7D+neOE4ESa3no3TB3dmUhFAzqhWs44rleL/wq+h4+fnINKJvI2e/73Hcx67ig /es/languages/graphql.js
sha384-sYfgkTuyw8lkHmGdVV7Mw1/C2jkRl3ZKZrSceJsMaqZAG2RNed+pSOfjwMMEIBO7 /es/languages/graphql.min.js
sha384-7m427rj9OYl8KKObOk+aD0QhXmqXy6hU/sHGS6OUwW9hRiiHvr+tLTbLiSJYbIyD /es/languages/http.js
sha384-GdKwMgTrO0R3SPXhm+DuaN3Qr7WkqYmmTClINAGPuV/BUPE9WUI/WnTEntp522Sl /es/languages/http.min.js
sha384-7hMYwsnoFLW0Wnjv4vRnZxuedW1tCz7/pydl1b9w3fg7B+rldToCjqzXwCRHUE7C /es/languages/ini.js
sha384-LDu6uT3diI3jBUJtdoGFa787cYlVrR+aqFfmW+kW+TImOkpVe+P5LBdDzydIHo9Z /es/languages/ini.min.js
sha384-WCznKe2n87QvV/L1MlXN+S8R6NPUQGU34+AqogMuWGZJswSD6rt3Mgih+xuKlDgm /es/languages/javascript.js
sha384-eGsBtetyKPDKaLiTnxTzhSzTFM6A/yjHBQIj4rAMVaLPKW5tJb8U6XLr/AikCPd+ /es/languages/javascript.min.js
sha384-12GbYFzdyZCSmfBTmO2CR/qE89K5uE1PEuJ3QUwXH0Q9u+uoLNigjH9dG7LAxxiI /es/languages/json.js
sha384-+DT7AtubDhVDciRc6CgjJJRsCt0L8NC3Dh8n9Tj2tZWU8rWxDIj1ViubmUDn8OCY /es/languages/json.min.js
sha384-/wxxiW4TOoBvBcArtUP+xcbijqqN1/XXmrasvn4NbMte+WPz8FnQbM089M1yn8je /es/languages/lasso.js
sha384-gCVyuWMnFFGQ6thm3jU8iLWbrbIjaaC/iR3u8pCmqgfBF285E47RprBsEz/Y/jlP /es/languages/lasso.min.js
sha384-JZ1yKn4lHbd05rOuRoUSoCM323D+X3s7vLYhESynzVpdWAFu5JNp6chDl5N9uc1c /es/languages/latex.js
sha384-dDJ50ltJ9VlfSOzSORI0KSNPcRIpLy1J0BmtdQGXBEY+7f57DAx754HVffzmWqC2 /es/languages/latex.min.js
sha384-iBzB3Gn/ezqfaxd3xkqjVlWlUdqCAcOUBIjD5IQGs9p7tbFNU8ymlgKpDsGRGaDQ /es/languages/less.js
sha384-04z6U6c1rUG3NEMdXE8dOimK4VJx8yGR1D5qKHgS7319t9s27xfmtQLQKC6jDUuY /es/languages/less.min.js
sha384-bWwkdmOCj83zZ8/m+oPD9goRMhrPCb25ZA6aTyg7vcsq9IpuyED38kQSw1Na4UTZ /es/languages/markdown.js
sha384-SqGSUq0DMQ0OUQnQnTuVDCJyhANd/MFNj+0PF67S+VXgHpR8A4tPsf/3GoSFRmrx /es/languages/markdown.min.js
sha384-ohJ9Jj8Mwyy7EntP4tGMJEtH90WJNKu2C4l37N1kqyTHgbRJyGYUgFe9z3qy3/C8 /es/languages/nginx.js
sha384-tpFPEHvbpL3dYF4uFiVNuCUF62TgMzuW65u5mvxnaJYun1sZwxBsKv+EvVgv3yQK /es/languages/nginx.min.js
sha384-JBkI+6623OoC1qCgG+MY/Ta0qRYSzTDH4NGMA+7U8RNOjkh7geFvYpRidvdHs3zT /es/languages/php.js
sha384-6Znh5S5q9F0hGNMtdaihFL3RJeMqL1a/UecjgzaBrhoxe4sjd5aiEOgokt7blhSW /es/languages/php.min.js
sha384-PpU3S+yZJ1Gj2R7L/OgTgkKELQOf7F1VcbaAEJwSFSM9lw2ON2wxq1FvUcUlm9ne /es/languages/powershell.js
sha384-pBczxETXXX/Ne92jpBviT47DPiv27FLNtvs0aMZH3W7rYXdwgf1gWg3pH4NmNC2V /es/languages/powershell.min.js
sha384-+5oyk7Ed3OlvEWGj8xracq/6e52BScKUN4kxcreNwB7kfRTVsAMs/aAJM58dzIFN /es/languages/python.js
sha384-ND/UH2UkaeWiej5v/oJspfKDz9BGUaVpoDcz4cof0jaiv/mCigjvy7RQ7e+3S6bg /es/languages/python.min.js
sha384-lRhSX2XDrY27NzrAS1t4YaeRtwjsY41kFBbIEYltkmnsfSE7lbBJMQVds2u/MqTT /es/languages/scss.js
sha384-RDUehV4j9Do6iGkYq9Gjn3aUxh6x+NFER1sHpLUXsNoCFjah8Ysrlad8ukLbIr4J /es/languages/scss.min.js
sha384-dzLjhd9nNJH62idgKI1vZEKHRBtZXSgwWQdPR+emG7tfAN4BW2g+A5Xs2315Uxii /es/languages/shell.js
sha384-RKUoelG22/D7BV/bNpoGLNzdTgWRf/ACQX7y4BGyIzK6E+xUoXtm68WNQW2tSW8X /es/languages/shell.min.js
sha384-rBAFhyrcRcMNbVJ9g4k5y3eQDkjGdgoOb3oTWTbHgwyUgUNv3CK9wLsGy/d+52oa /es/languages/sql.js
sha384-8G3qMPeOeXVKZ0wGzMQHgMVQWixLw3EXFAcU+IFNLRe0WoZB5St3L3ZLTK62Nzns /es/languages/sql.min.js
sha384-G1Opo3HxELoJ+Z/56DILHVhE3vs0B5gDypWNlWxjd4T6tE+KuV8dvFmDD4qKFAqQ /es/languages/stylus.js
sha384-xDDS9KwHtv72OFksAoRLSOzzD4H5DFtcSDwClXtktWSgfzUa5GBVC+QCa+JbXJo6 /es/languages/stylus.min.js
sha384-OE0Tch4fj9YpsZ5GehsIC+qt2LYAyGlva8PjzC97pmX6PUCR90+b9ZMmoKSQLSI5 /es/languages/vbscript.js
sha384-+GEu9SSqFFm1Oorzq3xLm59JzaVcoELsmjRU9e2/5+qKtgBvEqt98SfCW5RQ2vQ7 /es/languages/vbscript.min.js
sha384-z/hrHNlwMcvvjzudTkjlwSX/Udx/GbAKyhbvs7cjfYAS8l600ckGWLDqj/eM1peW /es/languages/vbscript-html.js
sha384-7rzHs2v9fu5E3xKT9BbxDXT4GNQvENpY8IWOVCKnwNvogY6AGwl92Ij/rt8Omiyq /es/languages/vbscript-html.min.js
sha384-C5Ib6vLvFc6BpxyyN5165sVTrN05Avl4ADMSVNVSmB61oPr42vOavsZlxOknqqWz /es/languages/wasm.js
sha384-FlAOV+6BVjUyajzW4twmqUvHxDYallf5jw5FewMZmsBHBuiJ/CJj1NZhNT1fHuzT /es/languages/wasm.min.js
sha384-OFoR8IZ+CFwcY8plx8HSDZNoCwLxc701CwdNGfoIEhSgwAbwhvInaxnEi3HYTt2Q /es/languages/xml.js
sha384-yFd3InBtG6WtAVgIl6iIdFKis8HmMC7GbbronB4lHJq3OLef3U8K9puak6MuVZqx /es/languages/xml.min.js
sha384-MX3xn8TktkjONV3aWF6Qn6WZyq2Lh/98p0v7D0qEoJ4WLdYjoAyXF/L/80q3qaEc /es/languages/yaml.js
sha384-4IiaMbQ0LBiRJYBGoAXsN+dV9qu/cGLES6IuVowdeCu/FAMY5/MQfD/bHXoL2YBb /es/languages/yaml.min.js
sha384-P+P4DfgP/4C1ysos0bmUaDSb12TkAtD1KFCW7BT6ELs3YIuEZITcGFDT8ReShWa7 /es/languages/zephir.js
sha384-iEOx9ajh9HkrFMP+goJQl2Dgl9iV2wpFywezRXb9E0sm5PIHETchiP9xFLgcYekX /es/languages/zephir.min.js
sha384-wWNyZqG6+Tb1rRskCP3qZjTwRbb9AXwkj1emJa1QFm/wqE5WZf93bjR9IAgcxXD7 /languages/accesslog.js
sha384-BF61I4vqlKI+Z6dQUyVuqQEE9RSYZWptePUuYrYLfxlYJT6r9qNemzfyAqJIXHRJ /languages/accesslog.min.js
sha384-hK+QzfKnkrwE7Fgc3q6lpKfnWWKMecpkQObMVOPiwopZiJni16bBGVm37SMGcz6G /languages/apache.js
sha384-bvrESIqIr21pkx86VgiN+Vfq8sRk/6xTxMfbo0PDENLfqYr123El7PUCzqJmir4P /languages/apache.min.js
sha384-qbbaBGYYg7PdopdWOGj8KdkBosUDY5PAe3aTMJKTqWcriPBJJzCVu5BlwNEwqr9U /languages/bash.js
sha384-ByZsYVIHcE8sB12cYY+NUpM80NAWHoBs5SL8VVocIvqVLdXf1hmXNSBn/H9leT4c /languages/bash.min.js
sha384-KNVj6C9bNyJrl0feAi64iBCZkXxoTQxDbAJqGlVos5lGlSTOHd+zE1xQgkPFoH4t /languages/basic.js
sha384-KfOKKkbUp6gWmUdMPNCj5Hqqmf9Z03BTs0GnM3hyrYlNBYXSt4O527wBkKrgxiIl /languages/basic.min.js
sha384-VZxKf0mjKYDwZIgrW+InqDfJ0YwYUFEMw/4YmpV1oKtVXFVmVq/Ga1vgq6zKTUqS /languages/c.js
sha384-mWenE7UXKnmYRcJ3mh+Os3iZ43BmFf9x3AZMM6gi/2sT6vxouPWspbTdREwWDO3w /languages/c.min.js
sha384-J4Ge+xXjXgzbK2FP+OyzIGHLfKU/RR0+cH4JJCaczeLETtVIvJdvqfikWlDuQ66e /languages/cpp.js
sha384-LMyrRAiUz6we2SGvYrwDd4TJoJZ+m/5c+4n4E64KVkfWFcZdlrs4Wabr0crMesyy /languages/cpp.min.js
sha384-r+7A/jkcLGRANSzU9aD5zusObqSlxvCXH+ijRULuyxTPos7GziEOvU9gkWjgGDSg /languages/csp.js
sha384-3RA6jlKLtef98fWpGKtFWwqUh3RIT+Fg73EzHy87JjmQZLPfeQvcOMoOpTwOhRiI /languages/csp.min.js
sha384-r9czyL17/ovexTOK33dRiTbHrtaMDzpUXW4iRpetdu1OhhckHXiFzpgZyni2t1PM /languages/css.js
sha384-HpHXnyEqHVbcY+nua3h7/ajfIrakWJxA3fmIZ9X9kbY45N6V+DPfMtfnLBeYEdCx /languages/css.min.js
sha384-+9Rtg2Bz4pdOgkMjD/Y4IbvMzkuZqZyZwhBIbRD7254eY5Zm2Sf3UFI6Bt5tpyT5 /languages/graphql.js
sha384-yqNr+JW52pR9ZNw8CIHWgGMIrqhKhuOBDSlQ1ulf4Gt6wqi+VUMGHP5j6ReSSRY5 /languages/graphql.min.js
sha384-g/lhU6FXH73RQL4eFwkPk4CuudGpbHg6cyVZCRpXft3EKCrcQTToBVEDRStjYWQb /languages/http.js
sha384-wt2eEhJoUmjz8wmTq0k9WvI19Pumi9/h7B87i0wc7QMYwnCJ0dcuyfcYo/ui1M6t /languages/http.min.js
sha384-JSUMPR+WT0h/7NlqXi1Al9bVlNT31AeZNpAHttuzu+r02AmxePeqvsZkKqYZf06n /languages/ini.js
sha384-QrHbXsWtJOiJjnLPKgutUfoIrj34yz0+JKPw4CFIDImvaTDQ/wxYyEz/zB3639vM /languages/ini.min.js
sha384-vJxw3XlwaqOQr8IlRPVIBO6DMML5W978fR21/GRI5PAF7yYi2WstLYNG1lXk6j9u /languages/javascript.js
sha384-44q2s9jxk8W5N9gAB0yn7UYLi9E2oVw8eHyaTZLkDS3WuZM/AttkAiVj6JoZuGS4 /languages/javascript.min.js
sha384-dq9sY7BcOdU/6YaN+YmFuWFG8MY2WYJG2w3RlDRfaVvjdHchE07Ss7ILfcZ56nUM /languages/json.js
sha384-RbRhXcXx5VHUdUaC5R0oV+XBXA5GhkaVCUzK8xN19K3FmtWSHyGVgulK92XnhBsI /languages/json.min.js
sha384-dQ7NhbnY4sLHpMxW1anE26hRdOLU0rLPXh7QNJk2t7cKS7VaiM2KPt6V4dLu5R+H /languages/lasso.js
sha384-ar1PV/gV1rM0g1bTSeJG9pFUGOuOsLuU54Fy1SaNvISa/KP56jGoyV+EHQS6NFQA /languages/lasso.min.js
sha384-0DF4M/uGwA0TYtI4/4/Nxlz/Z6TObHvf/Uhz39xsvP8TkITbNVOVhbxyOXgyUn2V /languages/latex.js
sha384-0ZgcpgIDZoDPMdyG1FHnl/MByMKt+W52UltboQpuA52+f4pniKOMFXfIfe4K4Byc /languages/latex.min.js
sha384-1c9TXIjKaFE96Q8dzV+3AF30su8LWfRZ6/PIqg1gPNQo+LMeGHwB602qIjQQ+CgC /languages/less.js
sha384-nT7qGhTl7ILVe2/0D834KL+fN+VL4uJg7GFmHHF8YMIg3LSbOrihvebWz6A6KLMD /languages/less.min.js
sha384-U+zIQPoVdPCO0o4poik2hYNbHtNm+L5OojDTulgIeEZTNz+LooLAm72d66mNjwKD /languages/markdown.js
sha384-mCUujHHbWJEjcupTTfWOk9YR3YCYNHaA578+TTXUd4LPi7fGNuMQbysbl1pmcIGd /languages/markdown.min.js
sha384-OtoDZeQykEsQoFzaA50vgmgr+D3F8WIaXZ0CZfYFivHEpkwCpRKT5Ptmuhjr5bfJ /languages/nginx.js
sha384-p6UV3HZc7zs9wUF6j4Knk3bpx1/JnhlwDoFnKJAOogB1cUi32u31NlnZ2s2dW8IR /languages/nginx.min.js
sha384-S1JDGPScVg8ikNKLZc4CSP0ZxLiJ7bOJMzTLfOzQiCxR6wPqAa+YtauHJXQpc2GV /languages/php.js
sha384-c1RNlWYUPEU/QhgCUumvQSdSFaq+yFhv3VfGTG/OTh8oirAi/Jnp6XbnqOLePgjg /languages/php.min.js
sha384-BW3J/7iREOC3EuqJwzGkDJb6FY9bVvkt70ipieV892fYAp8uReDMiO0/lrUPmkzL /languages/powershell.js
sha384-LWJZQx0dgGhEK7snfNYrQs5K+QKD1sOmE02sOQCz4br9UmqSJDvPLoUVFaUyFnjq /languages/powershell.min.js
sha384-zdZio5RcGiKQJCpe/1IXujPle3bIY8sbmvCabSU5G5GzWAzZtoRZfg9QAQXCL08q /languages/python.js
sha384-IP4vv4Aoh9Lyg8QyzVkAmn2JGoDCpgVHzVSrD3Z+rVyn7+s4wx4pRjv+go3TEwfj /languages/python.min.js
sha384-fwYddFsITuK2bPhi9RuIzwi4PTULEXgtEJsQzTdx97vOS/GHfrk+aNSLxEHgzQa5 /languages/scss.js
sha384-6u+QpCDqQidb5pcO+yBqy0xLJ30x30VlrFvXm8J84LMwGIw9q3U4u+Z9vFXlhB5x /languages/scss.min.js
sha384-KW3ZDReTAemYUfVHvH1MNQ/v6agCYYdMGdMteP/yVV+NetIJeDMx0ruUMTbr/SD3 /languages/shell.js
sha384-PDEMny3uYpCrSKwqVGLAwqCsc9u+9hYXauxVPqO6RXmlxSNKLoRByEBigU5lahmK /languages/shell.min.js
sha384-Dy7I/j0yJlyliWiNrkNqXfxDrbN65q40s3JColgTYZQ7QJa7lcmK0WUL3i00/T51 /languages/sql.js
sha384-8q00eP+tyV9451aJYD5ML3ftuHKsGnDcezp7EXMEclDg1fZVSoj8O+3VyJTkXmWp /languages/sql.min.js
sha384-zoSc+TuKb10CxRmrZq/TRFkoAEM6ozSv3Cf8r50TxTx1r1Hcqaa5leVOEES2zauv /languages/stylus.js
sha384-Rd520i2dTJt7Zlfxu1YaFucV2Fd029x6Zczn9h0nD/AruF9OBK3UjS7wa0N5z9PI /languages/stylus.min.js
sha384-ExivfVSytwDgcpGykhEMnzW9GjtspAVnDPc+GKjsYnh2tczWA9FLwz8dOFuA70WS /languages/vbscript.js
sha384-51jdo37NeOkYYUHq3Pv0sCaoGJOAFt9I2CIGGoQKDgY7YnquSMoA6f7FjfkxfZbb /languages/vbscript.min.js
sha384-RpvvJQk66YBOljKOySvSU+gwYHonkGw4nWKedZumV6kEi48+GejKPAUHKUPlTkVE /languages/vbscript-html.js
sha384-Q2pUgWvb2tvXq+8kfdAdSGQFgjcgBh46AFq4OzvGQTDptWTry+4Y9erDzpdag6vi /languages/vbscript-html.min.js
sha384-ry6bgnkpMB819ITiAptb7x+iphp9TkAJTFl2NZQfF7JCOxZE+DcJvsAUvP2t4Ccn /languages/wasm.js
sha384-fWMR10q8HCFcv4u/2S/P5JHw477fD1akWW/mGsZNig4vAOk4135GEWJft9llui8U /languages/wasm.min.js
sha384-+PuZYFfVX2UQZU2yKt/FsJUZNUPzZWxW7auXltsaecr1xLvzBYF3c5gYoyOs1++x /languages/xml.js
sha384-jgkY4GMNWfQcLLIoP1vg3FWXflDrRhcSXGBW6ONIWC2SOIv5H1Pa57sXs+aomCuZ /languages/xml.min.js
sha384-tB5cwwsX4Ddp7P4d+ZInDb3nt4ihEEglHXoQ18eVLlT7soEn7bfGfABWKIn1l+H2 /languages/yaml.js
sha384-WC56y8OaFPt5Kj2HX6JAumxUYEjQmBDcSTJy2pn/N8g7dg1hKjeNVrJYoxlpeVmz /languages/yaml.min.js
sha384-eo4U4Kauxgt5xPkKhmHVQ3idDZjES0mSvwcPaVYO+ThgwgSucj9Ho6ECkSknIVNa /languages/zephir.js
sha384-Pr0oPH6N1VmoBorqbt6dYr4vrTBJcMGglN0EiU/HYRSbqcEUsfF5AM4MF9hbAmEA /languages/zephir.min.js
sha384-t3lgXOufAME6kNh728Hfpl3xpPeMkKk+Vya64wO11p7NzPwF4IxHoVdbs6VzmWJq /highlight.js
sha384-FfKDAMNQ00nceLbsHW+1AHMpxneov+y9lv/tvo52GqYWtjqSXsJ05aZGkZ5AKsXf /highlight.min.js
```

