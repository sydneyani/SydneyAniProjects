import email
from email import policy
from email.parser import BytesParser

def parse_email_header(header):
    # Parse the email header using Python's email library
    msg = BytesParser(policy=policy.default).parsebytes(header)
    parsed_header = {
        "from": msg['From'],
        "to": msg['To'],
        "subject": msg['Subject'],
        # Add more fields as necessary
    }
    return parsed_header

def check_for_spoofing(parsed_header, domain_database):
    # Example check: Verify if the domain of the sender is in the domain database
    sender_domain = parsed_header["from"].split('@')[-1]
    return sender_domain in domain_database

# Example usage
email_header = b"""Delivered-To: oanimel1@gmail.com
Received: by 2002:a05:7000:9ea2:b0:54a:1f0a:e916 with SMTP id dw34csp3080349mab;
        Fri, 5 Jan 2024 21:09:07 -0800 (PST)
X-Google-Smtp-Source: AGHT+IHNA9ow8WiFwXBX68APbnB9GKkokSjt//RETDOh806GF7JOzXQkz54IcZEYfj73t4Ld2lZR
X-Received: by 2002:a05:6214:1cc3:b0:67f:c3da:f1db with SMTP id g3-20020a0562141cc300b0067fc3daf1dbmr591494qvd.93.1704517747007;
        Fri, 05 Jan 2024 21:09:07 -0800 (PST)
ARC-Seal: i=1; a=rsa-sha256; t=1704517746; cv=none;
        d=google.com; s=arc-20160816;
        b=qcH7/XX79gKHyvTD1lSR/2EVUBREGGByYCyAuuEayJCbq7Zi0V+80oKXxcMdRYZoJy
         EG6oeNpvrHtwwQvglLTILRjOuUAdybmjvoYfMEpNKWb1rNcKBCz60V3SUK7fZcroPiT5
         CP5mLnb2Z12yPfEqoDI3c8GIZi0LZ+J1NHHX/WIvTTPgfN9uzSI37QMEweTIFbYIqooi
         ooXyXiMgcy5jplxytypy8N1spz27NGm3OoCUrXk6kVPh9MZXUD6j59x5QJaG/Xs35nWY
         aNu/UGDoPqxLGaVmZKNFvIPuWGKtT9FuQLmU6a2bXu82XF1GczVnP7+Aa+jCarUtdzrH
         YksA==
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816;
        h=date:message-id:feedback-id:mime-version:list-unsubscribe:subject
         :to:from:domainkey-signature:dkim-signature;
        bh=/nG8LGb+HeRCk5CZ2AW3bBCf8WSxs9dW12kn1ICIcoo=;
        fh=51N+t37Q/c9fW6y8DMLgp64g5IftDBnIQQqWZbqn+/A=;
        b=uL0YiXBJkQqdg8AOMSbaNvuFpV8XT9cFmWgi2nBJYNKr3fO7XuJeIH0tTlPYLdTBpB
         OmTUfqjyscF1I/Fp9VOsPGPIIM2oDDWUlYEFqa/TmfC+e+Mn5SG9KQFD6o4hfs2m5xAG
         vDDc0E9wtjR08EtkS9PavQblBRsxdv9zc96IQU8NOv3HFpdb2qcxHorSk7JKN1eGBzxP
         2ObZgAY6MTQBuNZ262ndMXgWXSQlgVrGb1uesIzYikJsvbVXtjKHYYSQAdXqjwtkz0bG
         tXrdvVQu+PAdCu133csCD/fyyvo2KlEuL2MK9SbfSW1b63fUFC2a2sCJN2+V9+B2hnsD
         Z9vw==
ARC-Authentication-Results: i=1; mx.google.com;
       dkim=pass header.i=@fubar.com header.s=june08 header.b=mvwS8SvP;
       spf=pass (google.com: domain of alerts@fubar.com designates 66.172.49.147 as permitted sender) smtp.mailfrom=alerts@fubar.com;
       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=fubar.com
Return-Path: <alerts@fubar.com>
Received: from mailgw01.fubar.com (mailgw01.fubar.com. [66.172.49.147])
        by mx.google.com with ESMTP id r1-20020a0c8d01000000b00680703b9fa8si3213403qvb.289.2024.01.05.21.09.06
        for <oanimel1@gmail.com>;
        Fri, 05 Jan 2024 21:09:06 -0800 (PST)
Received-SPF: pass (google.com: domain of alerts@fubar.com designates 66.172.49.147 as permitted sender) client-ip=66.172.49.147;
Authentication-Results: mx.google.com;
       dkim=pass header.i=@fubar.com header.s=june08 header.b=mvwS8SvP;
       spf=pass (google.com: domain of alerts@fubar.com designates 66.172.49.147 as permitted sender) smtp.mailfrom=alerts@fubar.com;
       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=fubar.com
Received: from mailgw01.fubar.com (mailadm003 [10.1.1.117]) by mailgw01.fubar.com (Postfix) with ESMTP id 59DC8C9EDE9 for <oanimel1@gmail.com>; Fri,
  5 Jan 2024 21:09:06 -0800 (PST)
DKIM-Signature: v=1; a=rsa-sha1; c=relaxed; d=fubar.com; h=from:to :subject:list-unsubscribe:mime-version:content-type:feedback-id :message-id:date; s=june08; bh=uoKVLWmdfsVEQGvRUCZaQdkaGEA=; b=m vwS8SvPLgk/NFcCCJx6K6SUyzI268dqKD+DDVMOQ3YbBSH+SH7WVxkAhOZ02IKTT g/hkQ/xrke/TAaPxJpM/qQVzLGSOk+/XTnrJ4eKXz/FLymAKlraZBVYidfxk29y+ B0M4xOVlllbV/JfiRiv1NRjC0vU9WAQac3LFOMqS+M=
DomainKey-Signature: a=rsa-sha1; c=nofws; d=fubar.com; h=from:to:subject :list-unsubscribe:mime-version:content-type:feedback-id :message-id:date; q=dns; s=june08; b=Olo8C95QYb9yX0jKW8rqsjAiU26 JVyQ2wfm/On8GcmMDX+D6+HPXdEb5myejg+eBPmS/V/+F1C3qyRggchR1aXs2rpc r2rX4GJx1E19LBEf5oQJ07e+y3bnrMyEbGKOaCA9lQ801udL8fCk5WGpQtXrt1Jf hGRZPLS8qsAvBU7k=
Received: from 10.1.1.61 (www67-int [10.1.1.7]) by mailgw01.fubar.com (Postfix) with SMTP id 4BBC0C9ECD8 for <oanimel1@gmail.com>; Fri,
  5 Jan 2024 21:09:06 -0800 (PST)
From: fubar alert <alerts@fubar.com>
To: oanimel1@gmail.com
Subject: Naughty n Tattooed Princess misses you on fubar!
List-Unsubscribe: <mailto:email_unsubscribe@fubar.com>, <http://fubar.com/unsub.php?e=VmpOclkxbHZiR3R3TjJjM2JEbHFRWGhJZFZkRU0xaDNORmRtY2paTk5WRmxPSGQ0U25SVlVGQlVUVDA2T3Q3QUc5QXNkSlpiTGZPa0Rlc3NQd0k9>
Mime-Version: 1.0
Content-Type: multipart/alternative; boundary="np6598e07249564"
Feedback-ID: RECALL:REINVITE65:fubar_d47f8019a
Message-Id: <20240106050906.4BBC0C9ECD8@mailgw01.fubar.com>
Date: Fri,
  5 Jan 2024 21:09:06 -0800 (PST)

--np6598e07249564
Content-Type: text/plain;charset="ISO-8859-1"
Content-Transfer-Encoding: 7bit


Hello ,

Where have you been? Naughty n Tattooed Princess misses you on fubar and wants you back!

She requested we send you this message. Don't leave her hangin!!

Return to my home page - https://fubar.com/recall/619185682.27?uid_from=866049&ibh=WlhFeloySTJVRmQwYlRCM1UzQXJOR3d2WTFrelduaE1jMEZCZGpGWE5EbHpjR05sZGpreVJHMXhOMVEwY1ROVFRrVjFRM2xSTWxoU1UyY3ZlRVZhY1RvNkFaVVgzSGtSWjhOOTFQbEQ3UDZQVXc9PQ%3D%3D

 
Cheers,
- fubar Family


--np6598e07249564
Content-Type: text/html; charset="ISO-8859-1"
Content-Transfer-Encoding: quoted-printable


<table width=3D"650" style=3D"width:650px;font-family:Verdana,Arial,sans-se=
rif;;font-size:11px;color:#838383;" cellpadding=3D"0" cellspacing=3D"0" ali=
gn=3D"center"> <tr> <td style=3D"padding:0;text-align:left;font-family:Verd=
ana,Arial,sans-serif;" align=3D"left" nowrap><a href=3D"https://fubar.com/r=
ecall/619185682.27?uid_from=3D866049&ibh=3DWlhFeloySTJVRmQwYlRCM1UzQXJOR3d2=
WTFrelduaE1jMEZCZGpGWE5EbHpjR05sZGpreVJHMXhOMVEwY1ROVFRrVjFRM2xSTWxoU1UyY3Z=
lRVZhY1RvNkFaVVgzSGtSWjhOOTFQbEQ3UDZQVXc9PQ%3D%3D"><img src=3D"http://fubar=
.com/imgs/fubar_logo_email.jpg?1" width=3D"100" height=3D"42" alt=3D"fubar.=
com" title=3D"fubar.com" style=3D"width:100px;height:42px;" border=3D"0"></=
a></td><td style=3D"padding:0;text-align:right;font-family:Verdana,Arial,sa=
ns-serif;;vertical-align:bottom" align=3D"right" valign=3D"bottom" nowrap><=
/td></tr><tr height=3D"10" style=3D"height:10px"><td colspan=3D"2"></td></t=
r><tr><td bgcolor=3D"#000000" style=3D"background-color:#000000;padding:15p=
x;color:#bbbbbb;font-size:12px;" colspan=3D"2"><table style=3D"width:100%;m=
ax-width:500px;font-family:helvetica;margin-left:auto;margin-right:auto;" b=
order=3D"0" cellpadding=3D"0" cellspacing=3D"0"><tr><td align=3D"center" st=
yle=3D"padding-top:30px;"><table style=3D"width:100%;max-width:500px;font-f=
amily:helvetica;margin-left:auto;margin-right:auto;" border=3D"0" cellpaddi=
ng=3D"0" cellspacing=3D"0"><tr style=3D"background-color:#000000;"><td alig=
n=3D"center"><a href=3D"https://fubar.com/recall/619185682.27?uid_from=3D86=
6049&ibh=3DWlhFeloySTJVRmQwYlRCM1UzQXJOR3d2WTFrelduaE1jMEZCZGpGWE5EbHpjR05s=
ZGpreVJHMXhOMVEwY1ROVFRrVjFRM2xSTWxoU1UyY3ZlRVZhY1RvNkFaVVgzSGtSWjhOOTFQbEQ=
3UDZQVXc9PQ%3D%3D" style=3D"text-decoration:none;"><div style=3D"font-size:=
22px;color:white;"><div style=3D"color: white; line-height: 24px;">Your fri=
end, <span style=3D"color: #D3D3D3;">Naughty n...</span></div><div style=3D=
"color: white; line-height: 24px;">hasn't seen you around on fubar</div><di=
v style=3D"color: white; line-height: 24px;">and has reported you:</div></d=
iv><div style=3D"margin-top:20px; padding: 20px; border: 5px solid white;">=
<div style=3D"color: white;font-size: 46px; line-height: 46px;">MISSING</di=
v><div style=3D"color: white;font-size: 18px;color: #D3D3D3;">HAVE YOU SEEN=
 ME?</div><div style=3D"margin-top:15px;"><img valign=3D"middle" src=3D"/im=
gs/tn_pat_nophoto.jpg" style=3D"max-width:100px;max-height:100px;"  alt=3D"=
well"></div><div style=3D"color: #15c;font-size:20px;margin-top:10px;">well=
</div><div style=3D"margin-top: 15px;"><img style=3D"width: 300px;" src=3D"=
https://fubar.com/imgs/emails/invite/btn_login.png"></div><div style=3D"col=
or: white; margin-top: 15px; margin-bottom:15px; font-size: 46px; line-heig=
ht: 46px;">REWARD</div><div style=3D"font-size: 18px; color: #D3D3D3;">Log =
back into fubar</div><!-- <div style=3D"font-size: 18px; color: yellow">THE=
 NEXT 7 DAYS</div> --><div style=3D"font-size: 18px; color: #D3D3D3;">and y=
ou'll <span style=3D"font-size:20px;color:yellow">BOTH</span> get:</div><di=
v style=3D"font-size: 46px; color: #41e85c;">1 Million Points!</div></div><=
/a></td></tr></table></td></tr><tr><td align=3D"center"><table style=3D"wid=
th:100%;max-width:500px;font-family:helvetica;margin-left:auto;margin-right=
:auto;" border=3D"0" cellpadding=3D"0" cellspacing=3D"0"><tr><td align=3D"c=
enter" style=3D"padding-top:40px; padding-bottom: 20px;"><a href=3D"https:/=
/fubar.com/recall/619185682.27?uid_from=3D866049&ibh=3DWlhFeloySTJVRmQwYlRC=
M1UzQXJOR3d2WTFrelduaE1jMEZCZGpGWE5EbHpjR05sZGpreVJHMXhOMVEwY1ROVFRrVjFRM2x=
STWxoU1UyY3ZlRVZhY1RvNkFaVVgzSGtSWjhOOTFQbEQ3UDZQVXc9PQ%3D%3D"><img src=3D"=
https://fubar.com/imgs/emails/invite/logo_fubar.gif" /></a></td></tr></tabl=
e></td></tr><tr><td><table cellpadding=3D"0" cellspacing=3D"0" border=3D"0"=
 style=3D"width:100%;max-width:500px;margin-left:auto;margin-right:auto;"><=
tr style=3D"background-color:#282828"><td align=3D"center" valign=3D"top" s=
tyle=3D"padding-top:1em;padding-bottom:1em;"><div style=3D"font-family:helv=
etica;color:#eeeeee;font-size:11px;" align=3D"center"><a href=3D"https://fu=
bar.com/email_settings.php?s=3DVVRoa2JYWXhUMVZuU2pKMldEaEZVR3czUmxoV1F6STVZ=
bWgwY0VWM1ptVkJTR0kwUlVsb2VVVkhURGhYVldJdlppOHJaMGhVVWpSeFpFRlBPRWwxYlRvNk1=
iSlJaRVlsRHdkb3pSL2dFME83U3c9PQ%3D%3D" style=3D"color:#eeeeee;text-decorati=
on:none;">Click here</a> to unsubscribe from this invite.<div style=3D"max-=
width:200px;width:100%"><br>fubar - 50 Woodside Plaza #433 Redwood City, CA=
 94061<br></div></div></td></tr></table></td></tr></table><table style=3D"w=
idth:100%;max-width:500px;font-family:helvetica;margin-left:auto;margin-rig=
ht:auto;" border=3D"0" cellpadding=3D"0" cellspacing=3D"0"><tr><td align=3D=
"center"><img src=3D'https://fubar.com/emailpixel.php?h=3DUW1KcWJXMHdWVVZSV=
TI5Tk5uZ3ZOWE5WWjJweWVHUXlTekZHYmtGa1lUa3hWbEpwUVVsUVNVNWxTVDA2T25HUTFLa3R3=
R3ZRQ1BVU1U1UDBCYkU9&e=3D619185682&type=3DINVITE_BACK' alt=3D'' border=3D'0=
' /></td></tr></table>
<br />Cheers,<br />- fubar Family<br><br></td></tr></table><img src=3D"http=
s://fubar.com/recall/619185682.1" alt=3D"" title=3D"" border=3D"0" />
--np6598e07249564--


"""  # This should be a raw email header in bytes
parsed_header = parse_email_header(email_header)

# Assuming domain_database is a set or list of known good domains
domain_database = {"google.com"}
spoofing_result = check_for_spoofing(parsed_header, domain_database)

print("Is this email spoofed?", spoofing_result)
