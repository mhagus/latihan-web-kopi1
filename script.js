// ===== KOPI NUSANTARA - MAIN SCRIPT =====

$(document).ready(function() {
    
    // ===== NAVBAR SCROLL EFFECT =====
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('shadow-lg');
        } else {
            $('.navbar').removeClass('shadow-lg');
        }
    });

    // ===== FORM KONTAK VALIDATION =====
    const formKontak = $('#formKontak');
    
    if (formKontak.length) {
        // Real-time validation
        $('#nama').on('blur', function() {
            if ($(this).val().trim() === '') {
                $('#errorNama').text('Nama wajib diisi.');
            } else {
                $('#errorNama').text('');
            }
        });

        $('#email').on('input', function() {
            const emailPattern = /^[^\s]+@gmail\.com$/i;
            if (!emailPattern.test($(this).val())) {
                $('#errorEmail').text('Email harus @gmail.com');
            } else {
                $('#errorEmail').text('');
            }
        });

        $('#kategori').on('change', function() {
            if ($(this).val() === '') {
                $('#errorKategori').text('Pilih kategori.');
            } else {
                $('#errorKategori').text('');
            }
        });

        $('#pesan').on('input', function() {
            if ($(this).val().trim().length < 10) {
                $('#errorPesan').text('Pesan minimal 10 karakter.');
            } else {
                $('#errorPesan').text('');
            }
        });

        $('#tanggal').on('change', function() {
            const selectedDate = new Date($(this).val());
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                $('#errorTanggal').text('Tanggal tidak boleh di masa lalu.');
            } else {
                $('#errorTanggal').text('');
            }
        });

        $('#langganan').on('change', function() {
            if ($(this).is(':checked')) {
                showNotification('Terima kasih telah berlangganan newsletter!', 'success');
            }
        });

        // Form submit
        formKontak.on('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate all fields
            if ($('#nama').val().trim() === '') {
                $('#errorNama').text('Nama wajib diisi.');
                isValid = false;
            }
            
            const emailPattern = /^[^\s]+@gmail\.com$/i;
            if (!emailPattern.test($('#email').val())) {
                $('#errorEmail').text('Email harus @gmail.com');
                isValid = false;
            }
            
            if ($('#kategori').val() === '') {
                $('#errorKategori').text('Pilih kategori.');
                isValid = false;
            }
            
            if ($('#pesan').val().trim().length < 10) {
                $('#errorPesan').text('Pesan minimal 10 karakter.');
                isValid = false;
            }

            const selectedDate = new Date($('#tanggal').val());
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today || $('#tanggal').val() === '') {
                $('#errorTanggal').text('Tanggal tidak valid.');
                isValid = false;
            }
            
            if (isValid) {
                showNotification('Pesan berhasil dikirim!', 'success');
                formKontak[0].reset();
                $('.error-message').text('');
            }
        });
    }

    // ===== FORM PEMESANAN PRODUK =====
    $('#formPemesanan').on('submit', function(e) {
        e.preventDefault();
        
        const namaProduk = $('#namaProduk').val().trim();
        const jumlah = parseInt($('#jumlah').val());
        
        if (namaProduk === '' || isNaN(jumlah)) {
            showNotification('Semua kolom wajib diisi!', 'danger');
            return;
        }
        
        if (jumlah <= 0) {
            showNotification('Jumlah harus lebih dari 0!', 'danger');
            return;
        }
        
        showNotification(`Pemesanan ${namaProduk} sebanyak ${jumlah} berhasil!`, 'success');
        $(this)[0].reset();
    });

    // ===== TOMBOL BELI PRODUK =====
    $('.btn-beli').on('click', function(e) {
        e.preventDefault();
        const productName = $(this).closest('.card').find('.card-title').text();
        showNotification(`${productName} akan segera diproses!`, 'success');
    });

    // ===== GALLERY MODAL =====
    $('.gallery-item').on('click', function() {
        const imgSrc = $(this).find('img').attr('src');
        const title = $(this).find('.gallery-overlay h5').text();
        const description = $(this).find('.gallery-overlay p').text();
        
        $('#galleryModalLabel').text(title);
        $('#galleryModalImage').attr('src', imgSrc);
        $('#galleryModalDescription').text(description);
        
        const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
        galleryModal.show();
    });

    // ===== WEBINAR FORM VALIDATION =====
    const formWebinar = $('#formWebinar');
    
    if (formWebinar.length) {
        formWebinar.on('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            $('.error-message').text('');
            
            const nama = $('#namaWebinar').val().trim();
            if (nama === '') {
                $('#errorNamaWebinar').text('Nama wajib diisi.');
                isValid = false;
            }
            
            const email = $('#emailWebinar').val();
            const emailPattern = /^[^\s]+@[^\s]+\.[^\s]+$/;
            if (!emailPattern.test(email)) {
                $('#errorEmailWebinar').text('Format email tidak valid.');
                isValid = false;
            }
            
            const telepon = $('#teleponWebinar').val().trim();
            const phonePattern = /^[0-9]{10,13}$/;
            if (!phonePattern.test(telepon)) {
                $('#errorTeleponWebinar').text('Nomor telepon 10-13 digit.');
                isValid = false;
            }
            
            const pekerjaan = $('#pekerjaanWebinar').val();
            if (pekerjaan === '') {
                $('#errorPekerjaanWebinar').text('Pilih pekerjaan.');
                isValid = false;
            }
            
            if (isValid) {
                showNotification('Pendaftaran webinar berhasil! Link akan dikirim ke email.', 'success');
                formWebinar[0].reset();
            }
        });

        // Real-time validation
        $('#namaWebinar').on('blur', function() {
            $('#errorNamaWebinar').text($(this).val().trim() === '' ? 'Nama wajib diisi.' : '');
        });
        
        $('#emailWebinar').on('blur', function() {
            const emailPattern = /^[^\s]+@[^\s]+\.[^\s]+$/;
            $('#errorEmailWebinar').text(!emailPattern.test($(this).val()) ? 'Format email tidak valid.' : '');
        });
        
        $('#teleponWebinar').on('input', function() {
            const phonePattern = /^[0-9]{10,13}$/;
            $('#errorTeleponWebinar').text(!phonePattern.test($(this).val().trim()) ? 'Nomor telepon 10-13 digit.' : '');
        });
    }

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type) {
        $('.custom-notification').remove();
        
        const iconMap = {
            'success': 'check-circle',
            'danger': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        
        const notification = $(`
            <div class="custom-notification alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3" 
                 style="z-index: 9999; min-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                <i class="fas fa-${iconMap[type]} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
        
        $('body').append(notification);
        
        setTimeout(function() {
            notification.fadeOut(400, function() {
                $(this).remove();
            });
        }, 4000);
    }

    // ===== COUNTER ANIMATION =====
    function animateCounter() {
        $('.counter').each(function() {
            const $this = $(this);
            const target = parseInt($this.attr('data-target'));
            
            $({ count: 0 }).animate({ count: target }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.count));
                },
                complete: function() {
                    $this.text(target);
                }
            });
        });
    }

    // Trigger counter on scroll
    let counterAnimated = false;
    $(window).on('scroll', function() {
        if (!counterAnimated && $('.counter').length) {
            const counterTop = $('.counter').first().offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            
            if (windowBottom > counterTop) {
                animateCounter();
                counterAnimated = true;
            }
        }
    });

    // ===== RATING DISPLAY =====
    const ratingElement = $('#hasil-rating');
    if (ratingElement.length) {
        const rating = 4;
        if (rating >= 4.5) {
            ratingElement.html('⭐⭐⭐⭐⭐ Sangat Disarankan');
        } else if (rating >= 3) {
            ratingElement.html('⭐⭐⭐⭐ Direkomendasikan');
        } else {
            ratingElement.html('⭐⭐ Biasa');
        }
    }

    // ===== ACTIVE MENU HIGHLIGHTING =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('.nav-link').each(function() {
        const href = $(this).attr('href');
        if (href === currentPage) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    // ===== SMOOTH SCROLL =====
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.hash);
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

});