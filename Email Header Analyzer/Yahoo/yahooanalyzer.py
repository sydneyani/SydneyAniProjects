import email
from email import policy
from email.parser import BytesParser

def parse_email_header(header):
    msg = BytesParser(policy=policy.default).parsebytes(header)
    parsed_header = {
        "from": msg.get('From'),
        "spf": msg.get('Received-SPF'),
        "dkim": msg.get('DKIM-Signature'),
        # You might need to parse these fields to get the result if it's in a different format
    }
    return parsed_header

def check_for_spoofing(parsed_header, trusted_domain):
    # Basic checks for SPF and DKIM results
    spf_pass = 'pass' in parsed_header.get('spf', '').lower()
    dkim_pass = parsed_header.get('dkim') is not None
    from_domain = parsed_header.get('from').split('@')[-1].lower().strip('>')
    
    # Check if the domain in the 'From' header is the trusted domain
    domain_check = trusted_domain in from_domain
    
    # If SPF and DKIM pass and the from domain is the trusted domain, it's less likely to be spoofed
    return spf_pass and dkim_pass and domain_check

# Example usage
email_header_bytes = b"""Received: from 127.0.0.1
 by atlas-production.v2-mail-prod1-bf1.omega.yahoo.com pod-id atlas--production-bf1-f5f869c9-28bqw.bf1.yahoo.com with HTTP; Thu, 25 Jan 2024 12:14:01 +0000
Return-Path: <news@edm.cayennetech.com.tw>
X-Originating-Ip: [203.70.43.121]
Received-SPF: none (domain of edm.cayennetech.com.tw does not designate permitted sender hosts)
Authentication-Results: atlas-production.v2-mail-prod1-bf1.omega.yahoo.com;
 dkim=unknown;
 spf=none smtp.mailfrom=edm.cayennetech.com.tw;
 dmarc=unknown header.from=edm.cayennetech.com.tw;
X-Apparently-To: sydneyani@yahoo.com; Thu, 25 Jan 2024 12:14:02 +0000
X-YMailISG: _J9cirwWLDtUbYq_2AbHy2FP.os.UhkKJReq91qGuTBKtyVu
 7tmuHQ_kBxExl8CPpaQtUf3PJWngG7JEIvNew5GtXsbBfc3cDSPH1lcYOzyK
 G6ObeSzYp5pfw5XSZ0xOoJSlD8ChfR0z2RyqkiKOUYqCSI2f1y6SUYAnEQlA
 l1Q2HVQQZlDNKGaccFt4Qd4kD7porirQJA1CeVcKa6iEiSSxu8Kt0RyGbUXn
 gBW.5WOqNQ97ABSEqylzMKQ02_kNTTdKZ2LA9Pt74C8zXX894FVGvZOpXK_o
 owhCLT43sp4WbJkaOQZj9iq9D_0YxnHIo2ZMByhamF0Tb_FFvXNApxeY1RPt
 JkA_4Pmh2XTK7PLM0qRyRwYIT_.ynMYPDtVqheOSTlxz3EpC5L87q9Rq8nL2
 erB1IsvvPUsdfnUt6TlmEWDqnT.TBWDG7EJ3DoKQDM8iXxhL7_Vsk1QdxLQt
 mv8sCMsSF5dse5Chj7tyfRII2iUjZo_LSr1jyikbjRbor09vDphiOAU5Irk0
 FjJzaGdBcZPfc4kYE1VS3YZRb6V1KpvFz7iGsAvJ6Sd990aLKGX3UnmCGt1h
 O6k06iJAMl8EaMOcpfLXTv5IvWlGKGvzuTrJFKUD5PD0ouRqSATrZBHl_bC1
 fapsdV2ntSm9WPB2pPcak13rVCbzJURmGzwUk56QsBrfxiJVY26WqUolq8Ix
 zOB03Db4RFZMaMXjx90HcsPRIa6J4cUjTzHIjHE8X99kWOoidAeVYVaBdoJ9
 CI9AI5S2pAHwDeh_ymX6qdac6PeHT1XSgfbZUsLsMFCfL.T4bstoGps8bfOl
 Kim35BGdQc4OK3k2j76wKguBBIiAl6gVfw5AWXL3dihh6nErCH04sNURG9gw
 bZJ.pawFcZDoWSSbjrbayUo7wZvVNcQRpUJJn2oQ6vfFxtpaMVu7PhAUMaxr
 U7.bUx.6fKuMfyuavCmopn7ciPNZaWgkgKDK.oHqNGPg9zma4GRP8ITSd9wl
 F.02r6qfI1qRAzoQIFyM8dWGKCX15tSX6nnm3OKH8yJcpIM8.VPk_1vzLR9X
 kHJQw0w7JIg1JF0lWYTYcrKHaKOhw7kwcy5676uO2AVTbcYkzJDz7RAWQHAu
 jIVERCWxV45cDg5y8Z74iDq9WMUKtaEaZbu6znVcu2vpoj0iRQxSoNG4QFqU
 zNOhdZF6r8osL5I_w_mcA.N8d3MI3Ywngo2ktAyWJ2LCfaUTu28HZrlfHIMh
 AKKUs.13vzILMV2Vwob0LXxNg1ni9EgL7.8I5CfK3UXq.z84Jmsc1tr.q2x6
 ILo1O0IhuelkCj9ekRGf4W4BXIY_JADSCbNZyPSEat1Vc.DSIHG66opHSB_V
 q9hHfrzunpz5zK1o9tVuMLJUK_UlHAaIq_ujunI7eO2eR95LWrdqTg639m.5
 cNWY6CMRFylv0kUsazPr8e3pC5wZ8_5ILwHZVVlzLydL3kz_dB5AINJ1R56b
 zudFOxjUmvLlOAvJxdJfWPWTOeM4z3H0MaOhkE1VJZhqBJ5_cTZhBJwILtUj
 YPDt8zRCe8OskJ8DfckXJlj65JvW89pP_tfYX3r28lDOpb3W46n5snCMMTHj
 lulMDWdnuymG177Py_c6HuB_Dsr4ksHb3tnpjw--
Received: from 203.70.43.121 (EHLO dns1.cayennetech.com.tw)
 by 10.197.32.201 with SMTP;
 Thu, 25 Jan 2024 12:14:01 +0000
Received: by dns1.cayennetech.com.tw (Postfix, from userid 0)
	id B666A3F6104; Thu, 25 Jan 2024 18:48:49 +0800 (CST)
Received: from localhost (localhost [127.0.0.1])
	by dns1.cayennetech.com.tw (Postfix) with SMTP id 6D1343F6CD4;
	Thu, 25 Jan 2024 18:48:49 +0800 (CST)
Received: by cayennetech.com.tw (bulk_mailer v1.13); Thu, 25 Jan 2024 17:29:18 +0800
Subject: =?big5?B?MjAyNDAxMjUgLVdBU0FCSUmpeLr0vGms+atPw9Kkuq5lrdelvw==?=
Date:
Message-ID: <000e01da4f3e$e5818bd0$b084a370$@cayennetech.com.tw>
MIME-Version: 1.0
Content-Type: multipart/alternative;
	boundary="----=_NextPart_000_000F_01DA4F81.F3A4F2E0"
X-Mailer: Microsoft Outlook 16.0
Thread-Index: AdpPPl8aGWs6cD98QVSSJkjS+Y8kPg==
Content-Language: zh-tw
X-cayennetech-MailScanner: Not scanned: please contact your Internet E-Mail Service Provider for details, Not scanned: please contact your Internet E-Mail Service Provider for details
X-cayennetech-MailScanner-SpamCheck: not spam (whitelisted),
	SpamAssassin (not cached, score=-102.909, required 10,
	autolearn=not spam, ALL_TRUSTED -1.00, BAYES_00 -1.90,
	HTML_MESSAGE 0.00, USER_IN_WELCOMELIST -0.01,
	USER_IN_WHITELIST -100.00), not spam (whitelisted),
	SpamAssassin (cached, score=-102.909, required 10,
	autolearn=not spam, ALL_TRUSTED -1.00, BAYES_00 -1.90,
	HTML_MESSAGE 0.00, USER_IN_WELCOMELIST -0.01,
	USER_IN_WHITELIST -100.00)
X-cayennetech-MailScanner-Information: Please contact the ISP for more information
X-cayennetech-MailScanner-ID: E182840427.A14F5
X-cayennetech-MailScanner-From:
To: undisclosed-recipients:;
From: news@edm.cayennetech.com.tw
Content-Length: 3838

This is a multipart message in MIME format.

------=_NextPart_000_000F_01DA4F81.F3A4F2E0
Content-Type: text/plain;
	charset="big5"
Content-Transfer-Encoding: base64

v8u3Uqq6qrGuYbF6pm46DQoNCq/3pL2naa3Xpb+s9aTfu7a01K5UvNas7KfeqtGl96azra2kvaVx
oXVXQVNBQklJqXi69LxprPmrT8PSpLquZaF2oUEgDQoNCrjUsaG90KbcqXi69KxkrN2kvadpKCA8
aHR0cHM6Ly93d3cud2FzYWJpaS5jb20udHcvbm90aWNlL05vdGljZUNvbnRlbnQuYXNweD8NCks9
NDY1MjcmRz05OSZOPTM+IL3Qwkmn2imhQcHCwcKhQw0KDQogDQoNCiANCg0KIA0KDQo=

------=_NextPart_000_000F_01DA4F81.F3A4F2E0
Content-Type: text/html;
	charset="big5"
Content-Transfer-Encoding: quoted-printable

<html xmlns:v=3D"urn:schemas-microsoft-com:vml" =
xmlns:o=3D"urn:schemas-microsoft-com:office:office" =
xmlns:w=3D"urn:schemas-microsoft-com:office:word" =
xmlns:m=3D"http://schemas.microsoft.com/office/2004/12/omml" =
xmlns=3D"http://www.w3.org/TR/REC-html40"><head><meta =
http-equiv=3DContent-Type content=3D"text/html; charset=3Dbig5"><meta =
name=3DGenerator content=3D"Microsoft Word 15 (filtered =
medium)"><style><!--
/* Font Definitions */
@font-face
	{font-family:=B7s=B2=D3=A9=FA=C5=E9;
	panose-1:2 2 5 0 0 0 0 0 0 0;}
@font-face
	{font-family:"Cambria Math";
	panose-1:2 4 5 3 5 4 6 3 2 4;}
@font-face
	{font-family:Calibri;
	panose-1:2 15 5 2 2 2 4 3 2 4;}
@font-face
	{font-family:=B7L=B3n=A5=BF=B6=C2=C5=E9;
	panose-1:2 11 6 4 3 5 4 4 2 4;}
@font-face
	{font-family:"\@=B7s=B2=D3=A9=FA=C5=E9";
	panose-1:2 1 6 1 0 1 1 1 1 1;}
@font-face
	{font-family:"\@=B7L=B3n=A5=BF=B6=C2=C5=E9";}
/* Style Definitions */
p.MsoNormal, li.MsoNormal, div.MsoNormal
	{margin:0cm;
	font-size:12.0pt;
	font-family:"Calibri",sans-serif;}
a:link, span.MsoHyperlink
	{mso-style-priority:99;
	color:#0563C1;
	text-decoration:underline;}
span.EmailStyle19
	{mso-style-type:personal-reply;
	font-family:"Calibri",sans-serif;
	color:windowtext;}
.MsoChpDefault
	{mso-style-type:export-only;
	font-size:10.0pt;
	mso-ligatures:none;}
@page WordSection1
	{size:612.0pt 792.0pt;
	margin:72.0pt 90.0pt 72.0pt 90.0pt;}
div.WordSection1
	{page:WordSection1;}
--></style><!--[if gte mso 9]><xml>
<o:shapedefaults v:ext=3D"edit" spidmax=3D"1026" />
</xml><![endif]--><!--[if gte mso 9]><xml>
<o:shapelayout v:ext=3D"edit">
<o:idmap v:ext=3D"edit" data=3D"1" />
</o:shapelayout></xml><![endif]--></head><body lang=3DZH-TW =
link=3D"#0563C1" vlink=3D"#954F72" =
style=3D'word-wrap:break-word;text-justify-trim:punctuation'><div =
class=3DWordSection1><p class=3DMsoNormal><span =
style=3D'font-family:"=B7L=B3n=A5=BF=B6=C2=C5=E9",sans-serif'>=BF=CB=B7R=AA=
=BA=AA=B1=AEa=B1z=A6n<span lang=3DEN-US>:<o:p></o:p></span></span></p><p =
class=3DMsoNormal><span =
style=3D'font-family:"=B7L=B3n=A5=BF=B6=C2=C5=E9",sans-serif'>=AF=F7=A4=BD=
=A7i=AD=D7=A5=BF=AC=F5=A4=DF=BB=B6=B4=D4=AET=BC=D6=AC=EC=A7=DE=AA=D1=A5=F7=
=A6=B3=AD=AD=A4=BD=A5q=A1u<span =
lang=3DEN-US>WASABII</span>=A9x=BA=F4=BCi=AC=F9=ABO=C3=D2=A4=BA=AEe=A1v=A1=
A<span style=3D'color:#1F497D'> <span =
lang=3DEN-US><o:p></o:p></span></span></span></p><p =
class=3DMsoNormal><span =
style=3D'font-family:"=B7L=B3n=A5=BF=B6=C2=C5=E9",sans-serif'>=B8=D4=B1=A1=
=BD=D0=A6=DC=A9x=BA=F4=ACd=AC=DD=A4=BD=A7i<span lang=3DEN-US>(<a =
href=3D"https://www.wasabii.com.tw/notice/NoticeContent.aspx?K=3D46527&am=
p;G=3D99&amp;N=3D3"><span lang=3DEN-US><span =
lang=3DEN-US>=BD=D0=C2I=A7=DA</span></span></a>)</span>=A1A=C1=C2=C1=C2=A1=
C<span lang=3DEN-US =
style=3D'color:#1F497D'><o:p></o:p></span></span></p><p =
class=3DMsoNormal><span lang=3DEN-US =
style=3D'font-family:"=B7L=B3n=A5=BF=B6=C2=C5=E9",sans-serif'><o:p>&nbsp;=
</o:p></span></p><p class=3DMsoNormal><span lang=3DEN-US =
style=3D'font-family:"=B7L=B3n=A5=BF=B6=C2=C5=E9",sans-serif'><o:p>&nbsp;=
</o:p></span></p><p class=3DMsoNormal><span =
lang=3DEN-US><o:p>&nbsp;</o:p></span></p></div></body></html>
------=_NextPart_000_000F_01DA4F81.F3A4F2E0--"""  # replace with your actual email header in bytes
parsed_header = parse_email_header(email_header_bytes)

trusted_domain = "yahoo.com"
spoofing_result = check_for_spoofing(parsed_header, trusted_domain)

print("Is this email likely spoofed from Yahoo?", not spoofing_result)
